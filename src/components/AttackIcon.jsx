import React, { useState } from 'react';
import 'animate.css';

function AttackIcon(props){

    const aliveClasses = "md:block mx-6 my-2 md:my-5 md:mx-auto text-6xl md:text-5xl bg-gray-200 hover:bg-gray-300 p-2 rounded shadow flipX animated";
    const deadClasses = "md:block mx-6 my-2 md:my-5 md:mx-auto text-6xl md:text-5xl bg-red-200 hover:red-200 p-2 rounded shadow flipX text-gray-200";

    const [animation, setAnimation] = useState("");

    function animate(){
        setAnimation("animated bounceIn faster");

        setTimeout(() => setAnimation(null), 500);
    }

    return (
        <button
            className={props.fight.heroes[props.index].currentHealth > 0 ? aliveClasses : deadClasses}
            onClick={() => {
                props.hit(props.index);
                animate();
            }}
            disabled={props.fight.heroes[props.index].currentHealth <= 0}
        >
            <div className={animation}>{props.icon}</div>
        </button>
    );
}

export default AttackIcon;