import React, {useState, useEffect} from 'react';
import * as Icons from 'react-icons/gi';
import {FaFistRaised, FaHeart, FaShieldAlt} from 'react-icons/fa';
import CountUp from 'react-countup';
import 'animate.css';

import {GameContext} from "../GameContext";

function Hero({hero}) {
    const {state, dispatch} = React.useContext(GameContext);

    const Icon = Icons[hero.icon];

    const percentOfHealth = hero.currentHealth && (hero.currentHealth * 100 / hero.health);

    const [animation, setAnimation] = useState("");

    useEffect(() => {
        state.fight.heroes && setAnimation("bg-red-300");

        setTimeout(() => setAnimation(""), 500);
    }, [hero.currentHealth]);

    return (
        <div className="relative mx-4">
            {!hero.currentHealth && state.gold >= hero.upgradeCost &&
                <div
                    className="absolute z-10 top-0 w-full h-full bg-gray-800 hover:bg-gray-900 opacity-50 flex justify-center items-center text-yellow-500 cursor-pointer uppercase font-bold tracking-widest animated zoomIn"
                    onClick={() => dispatch({type: "heroUpgrade", payload: hero})}
                >
                    Awansuj
                </div>
            }
            <div className={`my-5 md:my-12 px-8 py-4 rounded shadow-md bg-white items-center flex flex-wrap lg:flex-no-wrap justify-center lg:justify-between animated zoomIn animate ${animation} ${hero.currentHealth <= 0 ? "grayscale bg-gray-300" : null}`}>
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
                          {hero.currentHealth ??
                              <CountUp
                                  start={hero.previous ? hero.previous.health : hero.health}
                                  end={hero.health}
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
                        {hero.currentDefense ??
                            <CountUp
                                start={hero.previous ? hero.previous.defense : hero.defense}
                                end={hero.defense}
                            />
                        }
                      </span>
                    </div>
                </div>
            </div>
            {hero.currentHealth ?
                <div className="absolute bg-grey-light overflow-hidden w-full" style={{top: "100%", left: 0, width: "100%"}}>
                    <div 
                        className="bg-red-600 text-xs leading-none py-1 text-center text-white animate"
                        style={{width: percentOfHealth > 0 ? percentOfHealth + "%" : 0}}
                    />
                </div>
                :
                null
            }
        </div>
    );
}

export default Hero;
