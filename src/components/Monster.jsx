import React, {useState, useEffect} from 'react';
import * as Icons from 'react-icons/gi';
import 'animate.css';

import {GameContext} from "../GameContext";

function Monster() {
    const {state} = React.useContext(GameContext);

    const monster = state.fight && state.fight.monster;

    const Icon = Icons[monster.icon];

    const percentOfHealth = monster.currentHealth * 100 / monster.health;

    const [monsterAnimation, setMonsterAnimation] = useState("");
    const [damageAnimation, setDamageAnimation] = useState("");

    useEffect(() => {
        monster.currentHealth < monster.health && setMonsterAnimation("text-red-700 rubberBand");

        const monsterTimeout = setTimeout(() => setMonsterAnimation(""), 500);

        monster.currentHealth < monster.health && setDamageAnimation("zoomInDown");

        const damageTimeout = setTimeout(() => setDamageAnimation("zoomOutUp"), 500);

        return () => {
            clearTimeout(monsterTimeout);
            clearTimeout(damageTimeout);
        }
    }, [monster.currentHealth]);

    return (
        <>
            <h1 className="text-3xl md:text-5xl opacity">{monster.name}</h1>
            <span className={`-mb-6 text-2xl text-red-600 animated faster ${damageAnimation} ${state.fight.lastHit === 0 && "invisible"}`}>-{state.fight.lastHit}</span>
            <Icon size="33vh" className={`z-10 animated faster ${monsterAnimation}`} />
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
