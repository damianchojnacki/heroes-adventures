import React, {useState, useEffect} from 'react';
import * as Icons from 'react-icons/gi';
import 'animate.css';

import {GameContext} from "../GameContext";

function Monster() {
    const {state} = React.useContext(GameContext);

    const monster = state.fight.monster;

    const Icon = Icons[monster.icon];

    const percentOfHealth = monster.currentHealth * 100 / monster.health;

    const [animation, setAnimation] = useState("");

    useEffect(() => {
        monster.currentHealth < monster.health && setAnimation("text-red-700 animated rubberBand faster");

        setTimeout(() => setAnimation(""), 500);
    }, [monster.currentHealth]);

    return (
        <>
            <h1 className="mb-5 md:mb-8 text-3xl md:text-5xl">{monster.name}</h1>
            <Icon size="33vh" className={animation} />
            <div className="z-20 m-6 md:m-8 shadow bg-gray-100 overflow-hidden w-full">
                <div 
                    className="bg-red-600 py-1 md:py-2 text-sm md:text-base leading-none text-center text-white animate"
                    style={{width: percentOfHealth >= 0 ? percentOfHealth + "%" : 0}}
                >
                    {monster.currentHealth}
                </div>
            </div>
        </>
    );
}

export default Monster;
