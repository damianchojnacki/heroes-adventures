class Monster{
    static getStats(level){
        return {
            health: 300 * level + Math.pow(3, level) + 200,
            strength: 4 * level + Math.pow(2, level),
        }
    }
}

export default Monster;