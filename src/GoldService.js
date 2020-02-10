class GoldService{
    static get(){
        !localStorage.getItem("gold") && localStorage.setItem("gold", 0);

        return parseInt(localStorage.getItem("gold"));
    }

    static set(value){
        localStorage.setItem("gold", value);

        return parseInt(localStorage.getItem("gold"));
    }

    static add(value){
        const actualMoney = this.get();

        localStorage.setItem("gold", parseInt(actualMoney) + value);

        return parseInt(localStorage.getItem("gold"));
    }

    static sub(value){
        const actualMoney = this.get();

        localStorage.setItem("gold", parseInt(actualMoney) - value);

        return parseInt(localStorage.getItem("gold"));
    }
}

export default GoldService;