import GoldService from "./GoldService";
import bosses from '../json/bosses';
import Memory from "../helpers/Memory";

class MonsterService {
    static getStats(level) {
        return {
            health: 100 + 40 * (3 * (level + 1)),
            strength: 12 + (6 * (level + 1)),
        }
    }

    static getBoss() {
        !Memory.exist('boss') && Memory.save("boss", 1);

        const stats = this.getStats(Memory.get("boss"));

        return {
            ...stats,
            ...bosses[Memory.get("boss") - 1]
        }
    }

    static calculateEarnings(monster){
        return Math.round(parseInt(monster.health) / 10 + parseInt(monster.strength) * 2);
    }

    static next() {
        const current = this.getBoss();

        GoldService.add(this.calculateEarnings(current));

        Memory.increment("boss");
    }
}

export default MonsterService;