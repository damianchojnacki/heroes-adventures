import React, {useState} from 'react';
import {FaCog, FaTimes} from 'react-icons/fa';
import Memory from "../helpers/Memory";
import {GameContext} from "../GameContext";
import GoldService from "../services/GoldService";

function AdminTools(){
    const {state, dispatch} = React.useContext(GameContext);

    const [toggle, setToggle] = useState(false);

    function reset(obj){
        switch(obj){
            case "game":
                localStorage.clear();
            break;

            case "fight":
                dispatch({type: "reset"});
            break;

            case "gold":
                GoldService.reset();
            break;

            case "heroes-level":
                Memory.remove("warrior");
                Memory.remove("ranger");
                Memory.remove("mage");
                Memory.remove("heavy");
            break;

            case "heroes-health":
                const gold = GoldService.get();
                GoldService.add("10000");

                state.heroes.map(hero => dispatch({type: "heroHeal", payload: hero}));

                GoldService.set(gold);
            break;

            case "boss":
                Memory.remove("boss");
            break;
            default:
        }

        dispatch({type: "init"});
    }

    function addGold(value){
        GoldService.add(value);

        dispatch({type: "init"});
    }

    function subGold(value){
        GoldService.sub(value);

        dispatch({type: "init"});
    }

    function nextBoss(){
        state.progress.max > state.progress.current && Memory.increment("boss");

        dispatch({type: "init"});
    }

    function prevBoss(){
        state.progress.current > 1 && Memory.decrement("boss");

        dispatch({type: "init"});
    }

    return (
        <>
            <div className="fixed z-40 bottom-0 right-0 m-8 mt-6">
                <button className="text-4xl text-gray-700 hover:text-gray-900" onClick={() => setToggle(!toggle)}>
                    <FaCog/>
                </button>
            </div>

            <div
                className="absolute z-30 px-8 md:px-24 py-12 bg-gray-400 z-10 md:rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 inset-0 md:inset-1/2 h-fit opacity-9 md:translate-1/2"
                style={{display: toggle ? "block" : "none",}}
            >
                <FaTimes size="1.5rem" className="hidden md:block absolute top-0 right-0 m-5 cursor-pointer text-gray-700 hover:text-gray-900" onClick={() => setToggle(!toggle)}/>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="my-2 text-center">Reset:</h2>
                        <button className="px-6 py-2 bg-blue-700 my-1" onClick={() => reset("game")}>Game</button>
                        <button className="px-6 py-2 bg-blue-700 my-1" onClick={() => reset("fight")}>Fight</button>
                        <button className="px-6 py-2 bg-blue-700 my-1" onClick={() => reset("gold")}>Gold</button>
                        <button className="px-6 py-2 bg-blue-700 my-1" onClick={() => reset("heroes-level")}>Heroes level</button>
                        <button className="px-6 py-2 bg-blue-700 my-1" onClick={() => reset("heroes-health")}>Heroes health</button>
                        <button className="px-6 py-2 bg-blue-700 my-1" onClick={() => reset("boss")}>Boss</button>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="my-2 text-center">Add:</h2>
                        <button className="px-6 py-2 bg-green-700 my-1" onClick={() => addGold(100)}>+100 Gold</button>
                        <button className="px-6 py-2 bg-green-700 my-1" onClick={() => addGold(250)}>+500 Gold</button>
                        <button className="px-6 py-2 bg-green-700 my-1" onClick={() => addGold(1000)}>+1000 Gold</button>
                        <button className="px-6 py-2 bg-green-700 my-1" onClick={() => nextBoss()}>Next boss</button>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="my-2 text-center">Sub:</h2>
                        <button className="px-6 py-2 bg-red-700 my-1" onClick={() => subGold(100)}>-100 Gold</button>
                        <button className="px-6 py-2 bg-red-700 my-1" onClick={() => subGold(250)}>-500 Gold</button>
                        <button className="px-6 py-2 bg-red-700 my-1" onClick={() => subGold(1000)}>-1000 Gold</button>
                        <button className="px-6 py-2 bg-red-700 my-1" onClick={() => prevBoss()}>Previous boss</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminTools;
