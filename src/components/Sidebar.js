import React, {useEffect, useState} from 'react';
import HeroesService from './HeroesService';

function Sidebar() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    (async function(){
      const heroes = await HeroesService.all();

      setHeroes(heroes);
    })();
  }, []);

  return (
    <>
      {heroes.map(hero => 
        <Hero data={hero}/>
      )}
    </>
  );
}

export default Sidebar;
