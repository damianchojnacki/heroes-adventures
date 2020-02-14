class Fight {
    heroes = {};
    monster = {};
    round = 0;
    end = false;
    won = false;
    lastHit = 0;

    constructor(heroes, monster) {
        this.heroes = heroes.map(hero => {
            hero.currentHealth = hero.health;
            hero.currentDefense = hero.defense;
            return hero;
        });

        this.monster = monster;

        this.monster.currentHealth = monster.health;
    }

    calculateHit(strength, defense = 0, level = this.monster.level){
        const additionalDamage = Math.random() * (level + 1) * (Math.random() < 0.5 ? -1 : 1);

        const hit = Math.ceil(strength + additionalDamage - defense);

        this.lastHit = (this.round !== 0 && this.round % 4 === 0) ? this.lastHit : hit;

        return hit;
    }

    isAlive(hero){
        return hero.currentHealth >= 0;
    }

    hit(index){
        let randomHero = 0;

        do{
            randomHero = Math.round(Math.random() * 3);
        } while(!this.isAlive(this.heroes[randomHero]));

        if(this.round !== 0 &&  this.round % 4 === 0)
            this.heroes[randomHero].currentHealth -= this.calculateHit(this.monster.strength, this.heroes[randomHero].currentDefense);
        else{
            this.heroes = this.heroes.map(hero => {
                hero.currentDefense = hero.defense;
                return hero;
            });

            this.heroes[index].currentDefense = 0;

            this.monster.currentHealth -= this.calculateHit(this.heroes[index].strength, 0, this.heroes[index].level);
        }

        if(this.monster.currentHealth <= 0){
            this.end = true;
            this.won = true;
        }

        if(
            this.heroes[0].currentHealth <= 0 &&
            this.heroes[1].currentHealth <= 0 &&
            this.heroes[2].currentHealth <= 0 &&
            this.heroes[3].currentHealth <= 0
        ){
            this.end = true;
            this.won = false;
        }

        this.round++;

        return this.round % 4 === 0 ? this.hit() : this;
    }
}

export default Fight;