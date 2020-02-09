import React, {useEffect, useState} from 'react';
import * as Icons from 'react-icons/gi';
import {FaHeart, FaFistRaised, FaShieldAlt} from 'react-icons/fa';
import GoldService from "../GoldService";

function Hero(props) {
    const hero = props.data;

    const Icon = Icons[hero.variant.icon];

    const [gold, setGold] = useState(0);

    useEffect(() => {
        const gold = GoldService.get();

        setGold(gold);
    }, []);

    return (
        <div className="relative">
            {gold >= hero.upgradeCost &&
                <div
                    className="absolute top-0 w-full h-full bg-gray-800 hover:bg-gray-900 opacity-75 flex justify-center items-center text-yellow-500 cursor-pointer uppercase font-bold tracking-widest"
                    onClick={() => props.upgrade(hero)}
                >
                    Awansuj
                </div>
            }
            <div className="m-4 px-8 py-4 rounded shadow-md bg-white flex items-center">
                <span className="text-5xl mr-8">
                    <Icon/>
                </span>
                    <span className="align-middle text-lg">
                    {hero.variant.name}
                </span>
                <div className="ml-auto flex w-1/2 justify-between">
                    <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                      <FaHeart/>
                      <span className="pl-1">{hero.health}</span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                      <FaFistRaised/>
                      <span className="pl-1">{hero.strength}</span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-700 text-white rounded">
                      <FaShieldAlt/>
                      <span className="pl-1">{hero.defense}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
