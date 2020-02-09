import React, {useEffect, useState} from 'react';
import HeroesService from '../HeroesService';
import Hero from './Hero';
import GoldService from "../GoldService";
import {FaCoins} from "react-icons/fa";

function Sidebar(props) {
    return (
        <>
            <div className="absolute top-0 bg-yellow-400 px-5 py-1 flex items-center rounded-b-lg shadow-md text-lg" style={{left: "50%", transform: "translateX(-50%)"}}>
              <FaCoins/>
              <span className="pl-1">{props.gold}</span>
            </div>
            {props.heroes.map(hero =>
                <Hero data={hero} key={hero.id} upgrade={props.upgrade} gold={props.gold}/>
            )}
        </>
    );
}

export default Sidebar;
