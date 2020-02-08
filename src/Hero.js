class Hero{
    static getInitialStats(role){
        switch(role){
            case "warrior":
                return {
                    level: 1,
                    health: 100,
                    strength: 10,
                    defense: 10,
                };
            case "ranger":
                return {
                    level: 1,
                    health: 50,
                    strength: 10,
                    defense: 5,
                };
            case "mage":
                return {
                    level: 1,
                    health: 25,
                    strength: 20,
                    defense: 10,
                };
            case "heavy":
                return {
                    level: 1,
                    health: 150,
                    strength: 10,
                    defense: 20,
                };
            default:
                return {
                    level: 1,
                    health: 100,
                    strength: 10,
                    defense: 10,
                };
        }
    }
}

export default Hero;