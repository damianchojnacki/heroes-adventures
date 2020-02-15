import React from 'react';
import * as Icons from 'react-icons/gi';
import 'animate.css';

import {GameContext} from "../GameContext";
import './progress.css';

function Progress() {
    const {state} = React.useContext(GameContext);

    function createMarks(){
        const marks = [];

        for(let i = 1; i <= state.progress.max; i++){
            const Icon = Icons[state.monsters[i - 1].icon];

            marks.push(<div className="progress__mark z-20 text-2xl text-white bg-gray-500 border-solid border-2 border-gray-600" key={i} style={{left: i / state.progress.max * 100 + "%"}}><Icon/></div>);

            console.log(marks);
        }

        return marks;
    }

    return (
        <div className="hidden md:block absolute w-full bottom-0">
            <div className="absolute w-1/12 bg-gray-500 py-1 bottom-0"/>
            <div className="w-11/12 relative ml-8">
                <span className="progress__dot bg-gray-700 shadow" style={{left: state.progress.percent + "%"}}/>
                <div className="progress z-10">
                    {createMarks()}
                </div>
                <div className="bg-gray-400">
                    <div
                        className="z-20 bg-gray-500 text-xs leading-none py-1 text-center text-white animate"
                        style={{width: state.progress.percent + "%"}}
                    />
                </div>
            </div>
            <div className="absolute w-1/12 bg-gray-400 py-1 bottom-0 right-0"/>
        </div>
    );
}

export default Progress;
