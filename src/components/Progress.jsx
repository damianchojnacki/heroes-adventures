import React from 'react';
import * as Icons from 'react-icons/gi';
import {FaCheckCircle} from 'react-icons/fa';
import 'animate.css';

import {GameContext} from "../GameContext";
import './progress.css';

function Progress() {
    const {state} = React.useContext(GameContext);

    function createMarks(){
        const marks = [];

        for(let i = 1; i <= state.progress.max; i++){
            const Icon = Icons[state.monsters[i - 1].icon];

            marks.push(<div className={`progress__mark z-20 text-2xl text-bg-gray-700 bg-gray-500 border-solid border-2 border-gray-600 ${i === state.progress.current ? "bg-blue-700 text-white" : i < state.progress.current && "text-green-700"}`} key={i} style={{left: i / state.progress.max * 100 + "%"}}>{i >= state.progress.current ? <Icon/> : <FaCheckCircle/>}</div>);
        }

        return marks;
    }

    return (
        <div className="md:absolute md:bottom-0 mt-6 md:mt-0 animate" style={{width: state.progress.max * 200 + "px", transform: `translateX(${-state.progress.percent / 1.25 + 2.5 + "%"})`}}>
            <div className="z-10 w-full relative">
                <span className="z-30 progress__dot bg-gray-700 shadow" style={{left: state.progress.percent + "%"}}/>
                <div className="progress z-20">
                    {createMarks()}
                </div>
                <div className="bg-gray-400">
                    <div
                        className="z-10 bg-gray-500 text-xs leading-none py-1 text-center text-white animate"
                        style={{width: state.progress.percent + "%"}}
                    />
                </div>
            </div>
        </div>
    );
}

export default Progress;
