import React, {useState} from 'react';

import Main from "./Main";
import Sidebar from "./Sidebar";
import Rules from './Rules';
import {GameContextProvider} from "../GameContext";
import AdminTools from "./AdminTools";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

function App() {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <GameContextProvider>
            <main className="lg:flex lg:h-screen overflow-hidden">
                <span className="absolute m-2 text-gray-500 text-sm">alpha release</span>
                <div className={`${toggleSidebar ? "lg:w-5/6 xl:w-11/12" : "lg:w-3/5 xl:w-2/3"} lg:h-full relative animate`}>
                    <Main />
                </div>
                <aside className={`${toggleSidebar ? "lg:w-1/6 xl:w-1/12" : "lg:w-2/5 xl:w-1/3"} lg:h-full bg-gray-200 shadow-2xl pt-8 relative z-20 animate`}>
                    <button className="absolute top-1/2 right-full rounded-l-full bg-gray-300 z-30 pl-1 py-2" onClick={() => setToggleSidebar(!toggleSidebar)}>
                        {toggleSidebar ? <FaAngleLeft/> : <FaAngleRight/>}
                    </button>
                    <Sidebar toggled={toggleSidebar}/>
                </aside>
                <Rules/>
                <AdminTools/>
            </main>
        </GameContextProvider>
    );
}

export default App;
