import React, {useEffect, useState} from 'react';
import FightService from "../FightService";
import * as Icons from 'react-icons/gi';

function Main() {
    const [boss, setBoss] = useState({});

    const Icon = boss.variant ? Icons[boss.variant.icon] : null;

    useEffect(() => {
        (async function () {
            const boss = await FightService.getBoss();

            setBoss(boss);
        })();
    }, []);

    return (
        <>
            {boss.variant &&
                <div className="h-full text-6xl flex flex-col justify-center items-center">
                    <h1 className="pb-8">{boss.variant.name}</h1>
                    <span style={{fontSize: "33vh"}}><Icon/></span>
                </div>
            }
        </>
    );
}

export default Main;
