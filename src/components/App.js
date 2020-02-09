import React, {useEffect, useState} from 'react';
import Main from "./Main";
import Sidebar from "./Sidebar";
import HeroesService from "../HeroesService";
import GoldService from "../GoldService";
import MonsterService from "../MonsterService";
import Fight from "../Fight";

function App() {
    const [heroes, setHeroes] = useState([]);
    const [gold, setGold] = useState(0);
    const [fight, setFight] = useState([]);
    const [round, setRound] = useState(0);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        (async function () {
            const heroes = await HeroesService.all();

            setHeroes(heroes);

            const gold = GoldService.get();

            setGold(gold);
        })();
    }, []);

    async function hit(id){
        if(!fight[round].end) {
            setFight([...fight, fight[round].hit(id)]);
            setRound(round + 1);
            if(fight[round].end) hit(0);
        } else{
            const heroes = await HeroesService.all();

            setHeroes(heroes);

            if(fight[round].won) await MonsterService.next();

            const gold = GoldService.get();

            setGold(gold);

            setFight([]);
            setRound(0);
        }
    }

    async function upgrade(hero) {
        HeroesService.upgrade(hero);

        const heroes = await HeroesService.all();

        setHeroes(heroes);

        const gold = GoldService.get();

        setGold(gold);
    }

    async function nextFight(){
        const monster = await MonsterService.getBoss();
        const heroes = await HeroesService.all();

        setFight([...fight, new Fight(heroes, monster)]);
    }

    return (
        <main className="lg:flex lg:h-screen">
            <div
                className="fixed px-24 py-12 bg-gray-400 z-10 rounded-lg shadow-lg"
                style={{
                    display: toggle ? "block" : "none",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "66%",
                    opacity: ".9"
                }}
            >
                <h2 className="text-2xl text-center mb-4">Zasady gry:</h2>
                <ol className="list-decimal">
                    <li className="my-4">
                        Obszar gry składa się z dwóch części:
                        <ul className="list-disc ml-5">
                            <li>po lewej stronie rozgrywa się walka</li>
                            <li>po prawej stronie znajduje się panel bohaterów</li>
                        </ul>
                    </li>
                    <li className="my-4">
                        Panel bohaterów to miejsce w którym możesz rozwijać postacie, oraz obserować ich statystyki podczas walki:
                        <ul className="list-disc ml-5">
                            <li>po lewej stronie możesz zauważyć nazwę i ikonę bohatera</li>
                            <li>po prawej stronie znajdują się jego statystyki, które zwiększają się wraz z poziomem.</li>
                        </ul>
                        Wraz z pokonywaniem przeciwników zdobywasz złoto, które można przeznaczyć na awans bohatera. Gdy zdobędziesz wystarczającą ilość złota, wyświetli się okno ulepszenia.
                    </li>
                    <li className="my-4">
                        Panel walki
                        <ul className="list-disc ml-5">
                            <li>po lewej stronie zobaczysz przeciwnika, z którym musisz się zmierzyć</li>
                            <li>za pomocą przycisków po prawej stronie wybierasz bohatera, który zaatakuje przeciwnika</li>
                            <li>UWAGA - na turę po zadaniu obrażeń, bohater jest wystawiony na atak (obrona zmniejsza się do 0)</li>
                        </ul>
                        Po zadaniu 4 ciosów w pierwszej turze, przeciwnik zaatakuje losowego bohatera. W kolejnych turach masz jedynie 3 ciosy zanim zostaniesz zaatakowany.
                    </li>
                </ol>
            </div>
            <div className="lg:w-3/5 lg:h-full xl:w-2/3 relative">
                <Main fight={fight[round]} hit={hit} nextFight={nextFight}/>
            </div>
            <aside className="lg:w-2/5 lg:h-full xl:w-1/3 bg-gray-200 shadow-2xl pt-8 relative">
                <Sidebar heroes={fight.length ? fight[round].heroes : heroes} gold={gold} upgrade={upgrade}/>
            </aside>
            <footer className="absolute bottom-0 left-0 m-5">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 shadow-md rounded-lg" onClick={() => setToggle(!toggle)}>Zasady gry</button>
            </footer>
        </main>
    );
}

export default App;
