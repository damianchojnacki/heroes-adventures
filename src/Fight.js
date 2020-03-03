class Fight {
    heroes = {};
    monster = {};
    round = 1;
    end = false;
    won = false;
    lastHit = 0;

    constructor(heroes, monster) {
        this.heroes = heroes;

        this.monster = monster;

        this.monster.currentHealth = monster.health;
    }

    calculateHit(strength, defense = 0, level = this.monster.level){
        const additionalDamage = Math.random() * (level + 1) * (Math.random() < 0.5 ? -1 : 1);

        const hit = Math.ceil(strength + additionalDamage - defense);

        this.lastHit = (this.round % 2 === 0) ? this.lastHit : hit;

        return hit;
    }

    isAlive(hero){
        return hero ? hero.currentHealth >= 0 : false;
    }

    hit(index){
        let randomHero = 0;

        do{
            randomHero = Math.round(Math.random() * (this.heroes.length - 1));
        } while(!this.isAlive(this.heroes[randomHero]));

        if(this.round % 2 === 0)
            this.heroes[randomHero].currentHealth -= this.calculateHit(this.monster.strength, this.heroes[randomHero].currentDefense);
        else
            this.monster.currentHealth -= this.calculateHit(this.heroes[index].strength, 0, this.heroes[index].level);

        if(this.monster.currentHealth <= 0){
            this.end = true;
            this.won = true;
        }

        if(
            !this.isAlive(this.heroes[0]) &&
            !this.isAlive(this.heroes[1]) &&
            !this.isAlive(this.heroes[2]) &&
            !this.isAlive(this.heroes[3])
        ){
            this.end = true;
            this.won = false;
        }

        this.round++;

        return (this.round % 2 === 0 && !this.end) ? this.hit() : this;
    }
}

export default Fight;
