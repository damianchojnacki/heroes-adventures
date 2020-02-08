import Hero from "./Hero";
import Axios from "axios";

class HeroesService {
    static async all(){
        const variants = await Axios.get("json/variants.json");

        const heroes = [
            {...this.warrior(), "variant": variants.data.warrior[this.warrior().level - 1]},
            {...this.ranger(), "variant": variants.data.ranger[this.ranger().level - 1]}, 
            {...this.mage(), "variant": variants.data.mage[this.mage().level - 1]},
            {...this.heavy(), "variant": variants.data.heavy[this.heavy().level - 1]},
        ];

        return heroes;
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
}

export default HeroesService;