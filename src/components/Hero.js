import React from 'react';
import * as Icons from 'react-icons/gi';
import {FaFistRaised, FaHeart, FaShieldAlt} from 'react-icons/fa';
import HeroesService from '../HeroesService';
import CountUp from 'react-countup';

function Hero(props) {
    const hero = props.data;

    const Icon = Icons[hero.variant.icon];

    const previousStats = HeroesService.getPreviousStats(hero) ? HeroesService.getPreviousStats(hero) : hero;

    const percentOfHealth = hero.currentHealth && (hero.currentHealth * 100 / hero.health);

    return (
        <div className="relative mx-4">
            {!hero.currentHealth && props.gold >= hero.upgradeCost &&
                <div
                    className="absolute top-0 w-full h-full bg-gray-800 hover:bg-gray-900 opacity-75 flex justify-center items-center text-yellow-500 cursor-pointer uppercase font-bold tracking-widest"
                    onClick={() => props.upgrade(hero)}
                >
                    Awansuj
                </div>
            }
            <div className="my-4 my-12 px-8 py-4 rounded shadow-md bg-white items-center flex flex-wrap lg:flex-no-wrap justify-center lg:justify-between">
                <span className="text-5xl mr-8">
                    <Icon/>
                </span>
                <span className="align-middle text-lg">
                    {hero.variant.name}
                </span>
                <div className="mt-4 lg:mt-0 ml-auto w-full lg:w-1/2 flex justify-around lg:justify-between">
                    <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                        <FaHeart/>
                        <span className="pl-1">
                          {hero.currentHealth ??
                              <CountUp
                                  start={previousStats.health}
                                  end={hero.health}
                                  onEnd={() => HeroesService.removePreviousStats(hero)}
                              />
                          }
                      </span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                        <FaFistRaised/>
                        <span className="pl-1">
                        <CountUp
                            start={previousStats.strength}
                            end={hero.strength}
                            onEnd={() => HeroesService.removePreviousStats(hero)}
                        />
                      </span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                        <FaShieldAlt/>
                        <span className="pl-1">
                        {hero.currentDefense ??
                            <CountUp
                                start={previousStats.defense}
                                end={hero.defense}
                                onEnd={() => HeroesService.removePreviousStats(hero)}
                            />
                        }
                      </span>
                    </div>
                </div>
            </div>
            {hero.currentHealth &&
                <div className="absolute shadow bg-grey-light overflow-hidden w-full" style={{top: "100%", left: 0, width: "100%"}}>
                    <div className="bg-red-600 text-xs leading-none py-1 text-center text-white" style={{width: percentOfHealth >= 0 ? percentOfHealth + "%" : "0"}}/>
                </div>
            }
        </div>
    );
}

export default Hero;
