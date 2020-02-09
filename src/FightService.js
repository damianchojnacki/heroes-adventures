import Hero from "./Hero";
import Axios from "axios";
import GoldService from "./GoldService";
import Monster from "./Monster";

class FightService {
   static async getBoss(){
       !localStorage.getItem("monster") && localStorage.setItem("monster", 1);

       const stats = Monster.getStats(localStorage.getItem("monster"));

       const variants = await Axios.get("json/bosses.json");

       return {
           ...stats,
           variant: variants.data[localStorage.getItem("monster") - 1]
       }
   }
}

export default FightService;