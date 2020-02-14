import React, { useState } from 'react';
import 'animate.css';
import {GiSkullCrossedBones} from "react-icons/all";

import {GameContext} from "../GameContext";

function AttackIcon(props){
    const {state, dispatch} = React.useContext(GameContext);

    const hero = state.fight.heroes[props.index];

    const dead = hero.currentHealth > 0;

    const percentOfHealth = hero.currentHealth && (hero.currentHealth * 100 / hero.health);

    const [animation, setAnimation] = useState("");

    function hit(){
        dispatch({type: "hit", payload: props.index});

        dead && setAnimation("animated bounceIn faster");

        setTimeout(() => setAnimation(null), 500);
    }

    return (
        <div className="inline-block md:block relative mx-6 my-2 md:my-5 md:mx-auto text-6xl md:text-5xl">
            <button
                className={`bg-gray-200 p-2 pb-3 md:pb-2 rounded shadow flipX animated ${dead ? "hover:bg-gray-300" : "grayscale text-gray-400"}`}
                onClick={() => hit()}
                disabled={!dead}
            >
                <div className={animation}>{dead ? props.icon : <GiSkullCrossedBones/>}</div>
            </button>
            <div className="md:hidden absolute bg-grey-light overflow-hidden w-full" style={{bottom: ".6rem", left: 0, width: "100%"}}>
                <div
                    className="bg-red-600 text-xs leading-none pb-1 text-center text-white animate"
                    style={{width: percentOfHealth > 0 ? percentOfHealth + "%" : 0}}
                />
            </div>
        </div>

    );
}

export default AttackIcon;