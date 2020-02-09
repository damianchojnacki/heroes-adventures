import React, {useEffect, useState} from 'react';
import HeroesService from '../HeroesService';
import Hero from './Hero';
import GoldService from "../GoldService";
import {FaCoins} from "react-icons/fa";

function Sidebar() {
    const [heroes, setHeroes] = useState([]);
    const [gold, setGold] = useState(0);

    useEffect(() => {
        getHeroes();
    }, []);

    async function getHeroes() {
        const heroes = await HeroesService.all();

        setHeroes(heroes);

        const gold = GoldService.get();

        setGold(gold);
    }

    function upgrade(hero) {
        HeroesService.upgrade(hero);

        getHeroes();
    }

    return (
        <>
            <div className="absolute top-0 bg-yellow-400 px-3 py-1 flex items-center rounded-b-lg shadow-md text-lg" style={{left: "50%", transform: "translateX(-50%)"}}>
              <FaCoins/>
              <span className="pl-1">{gold}</span>
            </div>
            {heroes.map(hero =>
                <Hero data={hero} key={hero.id} upgrade={upgrade} gold={gold}/>
            )}
        </>
    );
}

export default Sidebar;
