import GoldService from "./GoldService";
import bosses from './json/bosses';

class MonsterService {
    static getStats(level) {
        return {
            health: 160 * level + 200,
            strength: 18 * level,
        }
    }

    static getBoss() {
        !localStorage.getItem("monster") && localStorage.setItem("monster", 1);

        const stats = this.getStats(localStorage.getItem("monster"));

        return {
            ...stats,
            variant: bosses[localStorage.getItem("monster") - 1]
        }
    }

    static calculateEarnings(monster){
        return Math.round(parseInt(monster.health) / 10 + parseInt(monster.strength) * 2);
    }

    static async next() {
        const current = this.getBoss();

        GoldService.add(this.calculateEarnings(current));

        localStorage.setItem("monster", parseInt(localStorage.getItem("monster")) + 1);
    }
}

export default MonsterService;