class Monster{
    static getStats(level){
        return {
            health: 160 * level  + 200,
            strength: 18 * level,
        }
    }
}

export default Monster;