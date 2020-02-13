import React from 'react';
import Hero from './Hero';
import {FaCoins} from "react-icons/fa";
import 'animate.css';

import {GameContext} from "../GameContext";

function Sidebar() {
    const {state} = React.useContext(GameContext);

    const heroes = state.fight.heroes ? state.fight.heroes : state.heroes;

    return (
        <>
            <div className="absolute top-0 bg-yellow-400 px-5 py-1 flex items-center rounded-b-lg shadow-md text-lg" style={{left: "50%", transform: "translateX(-50%)"}}>
              <FaCoins/>
              <span className="pl-1">{state.gold}</span>
            </div>
            {heroes.map(hero =>
                <Hero key={hero.id} hero={hero}/>
            )}
        </>
    );
}

export default Sidebar;
