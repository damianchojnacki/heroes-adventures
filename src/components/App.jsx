import React from 'react';

import Main from "./Main";
import Sidebar from "./Sidebar";
import Rules from './Rules';
import {GameContextProvider} from "../GameContext";

function App() {

    return (
        <GameContextProvider>
            <main className="lg:flex lg:h-screen">
                <div className="lg:w-3/5 lg:h-full xl:w-2/3 relative">
                    <Main />
                </div>
                <aside className="lg:w-2/5 lg:h-full xl:w-1/3 bg-gray-200 shadow-2xl pt-8 relative z-20">
                    <Sidebar />
                </aside>
                <Rules/>
            </main>
        </GameContextProvider>
    );
}

export default App;
