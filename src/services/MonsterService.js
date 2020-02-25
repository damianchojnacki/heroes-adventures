import GoldService from "./GoldService";
import bosses from '../json/bosses';
import Memory from "../helpers/Memory";

class MonsterService {
    static getStats(level) {
        return {
            level: level,
            health: 15 * (3 * (level + 1)) - 50,
            strength: 6 * Math.sqrt(level + 1),
        }
    }

    static getProgress() {
        return {
            current: this.getLevel(),
            max: bosses.length,
            percent: this.getLevel() / bosses.length * 100,
        }
    }

    static getLevel(){
        !Memory.exist('boss') && Memory.save("boss", 1);

        return Memory.get("boss");
    }

    static getBoss() {
        const level = this.getLevel();

        return {
            ...this.getStats(level),
            ...bosses[Memory.get("boss") - 1]
        }
    }

    static calculateEarnings(monster){
        return Math.round(monster.health / 6 + monster.strength * 3);
    }

    static next() {
        const current = this.getBoss();

        GoldService.add(this.calculateEarnings(current));

        this.getLevel() && Memory.increment("boss");
    }

    static all(){
        return bosses;
    }
}

export default MonsterService;
