import React, {useState, useEffect} from 'react';
import * as Icons from 'react-icons/gi';
import 'animate.css';

function Monster(props) {
    const Icon = props.monster ? Icons[props.monster.variant.icon] : null;

    const percentOfHealth = props.monster ? (props.monster.currentHealth * 100 / props.monster.health) : 0;

    const [animation, setAnimation] = useState("");

    useEffect(() => {
        setAnimation("animated rubberBand faster");

        setTimeout(() => setAnimation(""), 500);
    }, [props.monster.currentHealth]);

    return (
        <>
            <h1 className="pb-8 text-5xl">{props.monster && props.monster.variant.name}</h1>
            <Icon size="33vh" className={animation} />
            <div className="z-20 shadow bg-gray-100 overflow-hidden w-full">
                <div 
                    className="bg-red-600 text-xs leading-none py-1 text-center text-white animate" 
                    style={{width: percentOfHealth >= 0 ? percentOfHealth + "%" : 0}}
                >
                    {props.monster.currentHealth}
                </div>
            </div>
        </>
    );
}

export default Monster;
