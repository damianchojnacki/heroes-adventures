class Memory{
    static get(name){
        let value = JSON.parse(localStorage.getItem(name));

        return value && (value.length || isNaN(value)) ? value : parseFloat(value);
    }

    static save(name, value){
        return localStorage.setItem(name, JSON.stringify(value));
    }

    static increment(name){
        return localStorage.setItem(name, this.get(name) + 1);
    }

    static decrement(name){
        return localStorage.setItem(name, this.get(name) - 1);
    }

    static exist(name){
        return !!localStorage.getItem(name);
    }

    static remove(name){
        localStorage.removeItem(name);
    }
}

export default Memory;