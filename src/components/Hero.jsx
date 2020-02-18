import React, {useState, useEffect} from 'react';
import * as Icons from 'react-icons/gi';
import {FaFistRaised, FaHeart, FaShieldAlt} from 'react-icons/fa';
import CountUp from 'react-countup';
import 'animate.css';

import {GameContext} from "../GameContext";
import HeroService from "../services/HeroService";

function Hero({hero}) {
    const {state, dispatch} = React.useContext(GameContext);

    const Icon = Icons[hero.icon];

    const percentOfHealth = hero.currentHealth && (hero.currentHealth * 100 / hero.health);
    const wounded = percentOfHealth !== 100;
    const dead = hero.currentHealth <= 0;

    const [animation, setAnimation] = useState("");

    useEffect(() => {
        state.fight && hero.currentHealth !== hero.health && setAnimation("bg-red-300");

        setTimeout(() => setAnimation(""), 500);
    }, [hero.currentHealth]);

    return (
        <div className="relative mx-4">
            {!state.fight && (wounded && hero.healCost <= state.gold) ?
                    <div
                        className="absolute z-10 top-0 w-full h-full bg-gray-800 hover:bg-gray-900 opacity-75 flex justify-center items-center text-red-700 cursor-pointer uppercase font-bold tracking-widest animated zoomIn"
                        onClick={() => dispatch({type: "heroHeal", payload: hero})}
                    >
                        Opatrz rany
                    </div>
                : state.gold >= hero.upgradeCost &&
                    <div
                        className="absolute z-10 top-0 w-full h-full bg-gray-800 hover:bg-gray-900 opacity-75 flex justify-center items-center text-yellow-500 cursor-pointer uppercase font-bold tracking-widest animated zoomIn"
                        onClick={() => dispatch({type: "heroUpgrade", payload: hero})}
                    >
                        Awansuj
                    </div>
            }
            <div className={`my-5 md:my-8 rounded shadow-md bg-white animated zoomIn animate ${animation} ${dead && "grayscale bg-gray-300"}`}>
                <div className="px-8 py-4 items-center flex flex-wrap lg:flex-no-wrap justify-center lg:justify-between">
                    <span className="text-5xl mr-8">
                        <Icon/>
                    </span>
                    <span className="align-middle text-lg">
                        {hero.name}
                    </span>
                    <div className="mt-4 lg:mt-0 ml-auto w-full lg:w-1/2 flex justify-around lg:justify-between">
                        <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                            <FaHeart/>
                            <span className="pl-1">
                              {state.fight ?
                                  hero.currentHealth
                                  :
                                  <CountUp
                                      start={hero.previous ? hero.previous.health : hero.health}
                                      end={hero.currentHealth}
                                  />
                              }
                          </span>
                        </div>
                        <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                            <FaFistRaised/>
                            <span className="pl-1">
                            <CountUp
                                start={hero.previous ? hero.previous.strength : hero.strength}
                                end={hero.strength}
                            />
                          </span>
                        </div>
                        <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                            <FaShieldAlt/>
                            <span className="pl-1">
                            <CountUp
                                start={hero.previous ? hero.previous.defense : hero.defense}
                                end={hero.defense}
                            />
                          </span>
                        </div>
                    </div>
                </div>
                <div className="bg-grey-light w-full">
                    <div
                        className={`rounded-bl bg-red-600 text-xs leading-none py-1 text-center text-white animate ${!wounded && "rounded-br"}`}
                        style={{width: !dead ? percentOfHealth + "%" : 0}}
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;
