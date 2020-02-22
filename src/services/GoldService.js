import Memory from '../helpers/Memory';

class GoldService {
    static get() {
        !Memory.exist("gold") && Memory.save("gold", 0);

        return Memory.get("gold");
    }

    static set(value) {
        Memory.save("gold", value);

        return Memory.get("gold");
    }

    static add(value) {
        const actualMoney = this.get();

        Memory.save("gold", actualMoney + value);

        return Memory.get("gold");
    }

    static sub(value) {
        const actualMoney = this.get();

        Memory.save("gold", actualMoney - value >= 0 ? actualMoney - value : 0)

        return Memory.get("gold");
    }

    static reset() {
        Memory.remove("gold");
    }
}

export default GoldService;