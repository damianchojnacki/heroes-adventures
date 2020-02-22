import * as React from "react";
import HeroService from "./services/HeroService";
import GoldService from "./services/GoldService";
import update from "react-addons-update";
import MonsterService from "./services/MonsterService";
import Fight from "./Fight";

const GameContext = React.createContext();

const initialState = {
    fight: null,
    heroes: [],
    monsters: [],
    gold: 0,
    progress: {
        current: 0,
        max: 0,
        percent: 0
    },
};

console.log(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return initialState;
        case "init":
            return  {
                ...state,
                heroes: HeroService.all(),
                monsters: MonsterService.all(),
                gold: GoldService.get(),
                progress: MonsterService.getProgress(),
            };
        case "fightStart":
            const monster = MonsterService.getBoss();
            const heroes = HeroService.all();

            return {
                ...state,
                fight: new Fight(heroes, monster)
            };
        case "heroUpgrade":
            const afterUpgrade = HeroService.upgrade(action.payload);

            return update(state, {
                heroes: {[action.payload.id - 1]: {$set: afterUpgrade.hero}},
                gold: {$set: afterUpgrade.gold}
            });
        case "heroHeal":
            const afterHeal = HeroService.heal(action.payload);

            return update(state, {
                heroes: {[action.payload.id - 1]: {$set: afterHeal.hero}},
                gold: {$set: afterHeal.gold}
            });
        case "hit":
            const nextRound = state.fight.hit(action.payload);

            if(nextRound.end){
                if(nextRound.won){
                    MonsterService.next();
                    HeroService.update(state.fight.heroes);
                }

                return {
                    ...state,
                    fight: null,
                    heroes: HeroService.all(),
                    gold:  GoldService.get(),
                    progress: MonsterService.getProgress(),
                };
            }

            return {
                ...state,
                fight: nextRound,
            };
        default:
    }
};

function GameContextProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
    );
}

const GameContextConsumer = GameContext.Consumer;

export { GameContext, GameContextProvider, GameContextConsumer };
