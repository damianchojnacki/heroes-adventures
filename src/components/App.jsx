import React, {useEffect, useState} from 'react';
import Main from "./Main";
import Sidebar from "./Sidebar";
import Rules from './Rules';
import HeroService from "../HeroService";
import GoldService from "../GoldService";
import MonsterService from "../MonsterService";
import Fight from "../Fight";
import update from 'react-addons-update';
import {FaQuestionCircle} from 'react-icons/fa';

function App() {
    const [heroes, setHeroes] = useState([]);
    const [gold, setGold] = useState(0);
    const [fight, setFight] = useState([]);
    const [round, setRound] = useState(0);
    const [toggle, setToggle] = useState(false);

    useEffect(() => restart(), []);

    function restart() {
        const heroes = HeroService.all();

        setHeroes(heroes);

        const gold = GoldService.get();

        setGold(gold);

        setFight([]);
        setRound(0);
    };

    function hit(id){
        if(!fight[round].end) {
            setFight([...fight, fight[round].hit(id)]);
            setRound(round + 1);
            
            if(fight[round].end) hit(0);
        } else{
            if(fight[round].won) MonsterService.next();

            restart();
        }
    }

    function upgrade(hero) {
        const afterUpgrade = HeroService.upgrade(hero);

        setHeroes(update(heroes, {
            [hero.id - 1]: {$set: afterUpgrade.hero},
        }));

        setGold(afterUpgrade.gold);
    }

    function nextFight(){
        const monster = MonsterService.getBoss();
        const heroes = HeroService.all();

        setFight([...fight, new Fight(heroes, monster)]);
    }

    return (
        <main className="lg:flex lg:h-screen">
            <div
                className="absolute z-30 px-8 md:px-24 py-12 bg-gray-400 z-10 md:rounded-lg shadow-lg text-justify w-full md:w-3/4 lg:w-2/3 inset-0 md:inset-1/2 h-fit opacity-9 md:translate-1/2"
                style={{display: toggle ? "block" : "none",}}
            >
                <Rules/>
            </div>
            <div className="lg:w-3/5 lg:h-full xl:w-2/3 relative">
                <Main fight={fight[round]} previousFight={fight.length > 1 && fight[round - 1]} hit={hit} nextFight={nextFight}/>
            </div>
            <aside className="lg:w-2/5 lg:h-full xl:w-1/3 bg-gray-200 shadow-2xl pt-8 relative z-20">
                <Sidebar heroes={fight.length ? fight[round].heroes : heroes} gold={gold} upgrade={upgrade} fight={fight.length > 1}/>
            </aside>
            <footer className="fixed z-40 bottom-0 left-0 m-5">
                <button className="text-2xl hover:text-gray-700" onClick={() => setToggle(!toggle)}>
                    <FaQuestionCircle/>
                </button>
            </footer>
        </main>
    );
}

export default App;
