class Hero{
    static getInitialStats(role){
        switch(role){
            case "warrior":
                return {
                    id: 1,
                    level: 1,
                    health: 100,
                    strength: 9,
                    defense: 10,
                };
            case "ranger":
                return {
                    id: 2,
                    level: 1,
                    health: 50,
                    strength: 12,
                    defense: 5,
                };
            case "mage":
                return {
                    id: 3,
                    level: 1,
                    health: 25,
                    strength: 20,
                    defense: 7,
                };
            case "heavy":
                return {
                    id: 4,
                    level: 1,
                    health: 180,
                    strength: 10,
                    defense: 20,
                };
            default:
                return {
                    id: 1,
                    level: 1,
                    health: 100,
                    strength: 10,
                    defense: 10,
                };
        }
    }

    static getRoleById(id){
        switch(id) {
            case 1:
                return "warrior";
            case 2:
                return "ranger";
            case 3:
                return "mage";
            case 4:
                return "heavy";
            default:
                return "warrior";
        }
    }

    static upgrade(hero){
        return {
            id: hero.id,
            level: hero.level + 1,
            health: hero.health * (hero.level + 1) ^ (hero.level + 1),
            strength: hero.strength * (hero.level + 1) ^ (hero.level + 1),
            defense: hero.defense * (hero.level + 1) ^ (hero.level + 1),
        }
    }
}

export default Hero;