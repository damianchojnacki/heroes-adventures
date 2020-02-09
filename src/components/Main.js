import React from 'react';
import * as Icons from 'react-icons/gi';
import {GiBroadsword, GiHighShot, GiMagicSwirl, GiBangingGavel} from "react-icons/all";

function Main(props) {
    const Icon = props.fight ? Icons[props.fight.monster.variant.icon] : null;

    const aliveClasses = "block my-5 mx-auto text-5xl bg-gray-200 hover:bg-gray-300 p-2 rounded shadow";
    const deadClasses = "block my-5 mx-auto text-5xl bg-red-200 hover:red-200 p-2 rounded shadow text-gray-200";

    return (
        <div className="flex justify-around items-center h-full py-12">
            {props.fight ?
                <>
                    <div className="text-6xl flex flex-col justify-center items-center">
                        <h1 className="pb-8">{props.fight.monster.variant.name}</h1>
                        <span style={{fontSize: "33vh"}}><Icon/></span>
                        {props.fight.monster.currentHealth}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl">Choose a fighter</h2>
                        <button
                            className={props.fight.heroes[0].currentHealth > 0 ? aliveClasses : deadClasses}
                            onClick={() => props.hit(0)}
                            style={{transform: "scaleX(-1)"}}
                            disabled={props.fight.heroes[0].currentHealth <= 0}
                        >
                            <GiBroadsword/>
                        </button>

                        <button
                            className={props.fight.heroes[1].currentHealth > 0 ? aliveClasses : deadClasses}
                            onClick={() => props.hit(1)}
                            style={{transform: "scaleX(-1)"}}
                            disabled={props.fight.heroes[1].currentHealth <= 0}
                        >
                            <GiHighShot/>
                        </button>

                        <button className={props.fight.heroes[2].currentHealth > 0 ? aliveClasses : deadClasses}
                                onClick={() => props.hit(2)}
                                style={{transform: "scaleX(-1)"}}
                                disabled={props.fight.heroes[2].currentHealth <= 0}
                        >
                            <GiMagicSwirl/>
                        </button>

                        <button className={props.fight.heroes[3].currentHealth > 0 ? aliveClasses : deadClasses}
                                onClick={() => props.hit(3)}
                                style={{transform: "scaleX(-1)"}}
                                disabled={props.fight.heroes[3].currentHealth <= 0}
                        >
                            <GiBangingGavel/>
                        </button>
                    </div>
                </>
                :
                <button className="text-2xl px-8 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg text-white shadow" onClick={() => props.nextFight()}>Walka</button>
            }
        </div>
    );
}

export default Main;
