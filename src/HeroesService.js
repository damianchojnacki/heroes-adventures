import Hero from "./Hero";
import Axios from "axios";
import GoldService from "./GoldService";

class HeroesService {
    static async all(){
        const variants = await Axios.get("json/variants.json");
        const costs = await Axios.get("json/costs.json");

        return [
            {
                ...this.warrior(),
                "variant": variants.data.warrior[this.warrior().level - 1],
                "upgradeCost": costs.data.warrior[this.warrior().level - 1]
            },
            {
                ...this.ranger(),
                "variant": variants.data.ranger[this.ranger().level - 1],
                "upgradeCost": costs.data.ranger[this.ranger().level - 1]
            },
            {
                ...this.mage(),
                "variant": variants.data.mage[this.mage().level - 1],
                "upgradeCost": costs.data.mage[this.mage().level - 1]
            },
            {
                ...this.heavy(),
                "variant": variants.data.heavy[this.heavy().level - 1],
                "upgradeCost": costs.data.heavy[this.heavy().level - 1]
            },
        ];
    }

    static getHero(role){
        if(!localStorage.getItem(role)) localStorage.setItem(role, JSON.stringify(Hero.getInitialStats(role)));

        return JSON.parse(localStorage.getItem(role));
    }

    static warrior() {
        return this.getHero("warrior");
    }

    static ranger() {
        return this.getHero("ranger");
    }

    static mage() {
        return this.getHero("mage");
    }

    static heavy() {
        return this.getHero("heavy");
    }

    static upgrade(hero){
        const newHero = Hero.upgrade(hero);

        const actualGold = GoldService.sub(hero.upgradeCost);

        localStorage.setItem(Hero.getRoleById(hero.id), JSON.stringify(newHero));

        return {
            hero: newHero,
            gold: actualGold,
        }
    }
}

export default HeroesService;