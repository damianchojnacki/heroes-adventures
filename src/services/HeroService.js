import GoldService from "./GoldService";
import variants from '../json/variants';
import costs from '../json/costs';
import heroes from '../json/heroes';
import Memory from "../helpers/Memory";
import MonsterService from "./MonsterService";

class HeroService {
    static all(){
        const heroes = [this.get("warrior"), this.get("ranger")];

        if(MonsterService.getLevel() > 7) heroes.push(this.get("mage"));
        if(MonsterService.getLevel() > 12) heroes.push(this.get("heavy"));

        return heroes;
    }

    static get(role){
        !Memory.exist(role) && Memory.save(role, heroes[role]);

        const hero = Memory.get(role);

        hero.currentHealth = hero.currentHealth ?? hero.health;

        const absolute = hero.currentHealth > 0 ? hero.currentHealth : 1;

        return {
            ...hero,
            ...variants[role][hero.level - 1],
            upgradeCost: costs[role][hero.level - 1],
            healCost: Math.round(Math.sqrt(10 / (absolute / hero.health))),
        };
    }

    static heal(hero){
        const newHero = this.getStatsAfterHeal(hero);
        const previous = newHero.previous;
        delete newHero.previous;

        const actualGold = GoldService.sub(hero.healCost);

        Memory.save(this.getRoleById(hero.id), newHero);

        return {
            hero: {
                ...newHero,
                previous: previous
            },
            gold: actualGold,
        }
    }

    static upgrade(hero){
        const newHero = this.getStatsAfterUpgrade(hero);
        const previous = newHero.previous;
        delete newHero.previous;

        const actualGold = GoldService.sub(hero.upgradeCost);

        Memory.save(this.getRoleById(hero.id), newHero);

        return {
            hero: {
                ...this.get(this.getRoleById(hero.id)),
                previous: previous
            },
            gold: actualGold,
        }
    }

    static update(heroes){
        heroes.map(hero => {
            delete hero.icon;
            delete hero.name;
            delete hero.upgradeCost;

            return hero;
        });

        heroes.map(hero => Memory.save(this.getRoleById(hero.id), hero));
    }

    static getRoleById(id){
        return Object.keys(heroes).find(key => heroes[key].id === id);
    }

    static getStatsAfterUpgrade(hero){
        return {
            id: hero.id,
            level: hero.level + 1,
            health: hero.health * (hero.level + 1),
            strength: hero.strength * (hero.level + 1),
            defense: (hero.defense * (hero.level + 1)) / 2,
            previous: {
                health: hero.health,
                strength: hero.strength,
                defense: hero.defense
            },
        }
    }

    static getStatsAfterHeal(hero){
        hero.currentHealth = hero.health;
        hero.previous = {health: hero.currentHealth};

        return hero;
    }
}

export default HeroService;
