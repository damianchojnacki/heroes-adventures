import React from 'react';
import * as Icons from 'react-icons/gi';
import {FaHeart, FaFistRaised, FaShieldAlt} from 'react-icons/fa';
import HeroesService from '../HeroesService';
import CountUp from 'react-countup';

function Hero(props) {
    const hero = props.data;

    const Icon = Icons[hero.variant.icon];

    const previousStats = HeroesService.getPreviousStats(hero) ? HeroesService.getPreviousStats(hero) : hero;

    return (
        <div className="relative">
            {props.gold >= hero.upgradeCost &&
                <div
                    className="absolute top-0 w-full h-full bg-gray-800 hover:bg-gray-900 opacity-75 flex justify-center items-center text-yellow-500 cursor-pointer uppercase font-bold tracking-widest"
                    onClick={() => props.upgrade(hero)}
                >
                    Awansuj
                </div>
            }
            <div className="m-4 px-8 py-4 rounded shadow-md bg-white items-center flex flex-wrap lg:flex-no-wrap justify-center lg:justify-between">
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
                        <CountUp
                            start={previousStats.health}
                            end={hero.health}
                            onEnd={() => HeroesService.removePreviousStats(hero)}
                        />
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
                        <CountUp
                            start={previousStats.defense}
                            end={hero.defense}
                            onEnd={() => HeroesService.removePreviousStats(hero)}
                        />
                      </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
