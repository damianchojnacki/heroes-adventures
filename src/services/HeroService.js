import GoldService from "./GoldService";
import variants from '../json/variants';
import costs from '../json/costs';
import heroes from '../json/heroes';
import Memory from "../helpers/Memory";

class HeroService {
    static all(){
        return [this.get("warrior"), this.get("ranger"), this.get("mage"), this.get("heavy")];
    }

    static get(role){
        !Memory.exist(role) && Memory.save(role, heroes[role]);

        const hero = Memory.get(role);

        return {
            ...hero,
            ...variants[role][hero.level - 1],
            upgradeCost: costs[role][hero.level - 1]
        };
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

    static getRoleById(id){
        return Object.keys(heroes).find(key => heroes[key].id === id);
    }

    static getStatsAfterUpgrade(hero){
        return {
            id: hero.id,
            level: hero.level + 1,
            health: hero.health * (hero.level + 1),
            strength: hero.strength * hero.level,
            defense: hero.defense * hero.level,
            previous: {
                health: hero.health,
                strength: hero.strength,
                defense: hero.defense
            },
        }
    }
}

export default HeroService;