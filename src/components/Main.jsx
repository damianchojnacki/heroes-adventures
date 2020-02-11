import React from 'react';
import {GiBroadsword, GiHighShot, GiMagicSwirl, GiBangingGavel} from "react-icons/gi";
import Particles from 'react-particles-js';
import 'animate.css';

import Monster from './Monster';
import AttackIcon from './AttackIcon';

function Main(props) {

    return (
        <>
            <Particles
                className="absolute w-full h-screen z-10"
                params={{
                    "particles": {
                        "number": {
                            "value": window.innerWidth / 30
                        },
                        "size": {
                            "value": 3
                        },
                        "color": {
                            "value": "#333333",
                            "opacity": 0.5
                        },
                        "line_linked": {
                            "enable": true, 
                            "distance": 300,
                            "color": "#333333",
                            "opacity": 0.1,
                            "width": 1
                          },
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "grab"
                            }
                        }
                    },
                }} 
            />
            <div className="flex flex-col md:flex-row justify-around items-center h-full py-12">
                {props.fight ?
                    <>
                        <div className="flex flex-col justify-center items-center">
                            <Monster monster={props.fight.monster} previousHealth={props.previousFight.monster}/>
                        </div>
                        <div className="z-20 text-center">
                            <h2 className="hidden md:block text-2xl">Choose an attacker</h2>
                            {[<GiBroadsword/>, <GiHighShot/>, <GiMagicSwirl/>, <GiBangingGavel/>].map((icon, index) => 
                                <AttackIcon {...props} icon={icon} index={index} key={index}/>     
                            )}
                        </div>
                    </>
                    :
                    <button className="z-20 text-2xl px-8 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg text-white shadow" onClick={() => props.nextFight()}>Walka</button>
                }
            </div>
            {/* TODO progress bar with boss icons */}
        </>
    );
}

export default Main;
