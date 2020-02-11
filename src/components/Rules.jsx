import React from 'react';

function Rules(){
    return (
        <>
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
        </>
    );
}

export default Rules;