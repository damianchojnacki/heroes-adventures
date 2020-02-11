import GoldService from "./GoldService";
import bosses from './json/bosses';
import Memory from "./Memory";

class MonsterService {
    static getStats(level) {
        return {
            health: 160 * level + 200,
            strength: 18 * level,
        }
    }

    static getBoss() {
        !Memory.exist('boss') && Memory.save("boss", 1);

        const stats = this.getStats(Memory.get("boss"));

        return {
            ...stats,
            variant: bosses[Memory.get("boss") - 1]
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