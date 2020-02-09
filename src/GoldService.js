class GoldService{
    static get(){
        !localStorage.getItem("gold") && localStorage.setItem("gold", 0);

        return localStorage.getItem("gold");
    }

    static set(value){
        localStorage.setItem("gold", value);

        return localStorage.getItem("gold");
    }

    static add(value){
        const actualMoney = this.get();

        localStorage.setItem("gold", actualMoney + value);

        return localStorage.getItem("gold");
    }

    static sub(value){
        const actualMoney = this.get();

        localStorage.setItem("gold", actualMoney - value);

        return localStorage.getItem("gold");
    }
}

export default GoldService;