import React, {useState} from 'react';
import {FaQuestionCircle, FaTimes} from 'react-icons/fa';

function Rules(){
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <footer className="fixed z-40 bottom-0 left-0 m-5">
                <button className="text-2xl text-gray-700 hover:text-gray-900" onClick={() => setToggle(!toggle)}>
                    <FaQuestionCircle/>
                </button>
            </footer>

            <div
                className="absolute z-30 px-8 md:px-24 py-12 bg-gray-400 z-10 md:rounded-lg shadow-lg text-justify w-full md:w-3/4 lg:w-2/3 inset-0 md:inset-1/2 h-fit opacity-9 md:translate-1/2"
                style={{display: toggle ? "block" : "none",}}
            >
                <FaTimes size="1.5rem" className="absolute top-0 right-0 m-5 cursor-pointer text-gray-700 hover:text-gray-900" onClick={() => setToggle(!toggle)}/>
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
        </>
    );
}

export default Rules;