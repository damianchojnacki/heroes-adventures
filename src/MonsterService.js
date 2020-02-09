import Axios from "axios";
import Monster from "./Monster";
import GoldService from "./GoldService";

class MonsterService {
   static async getBoss(){
       !localStorage.getItem("monster") && localStorage.setItem("monster", 1);

       const stats = Monster.getStats(localStorage.getItem("monster"));

       const variants = await Axios.get("json/bosses.json");

       return {
           ...stats,
           variant: variants.data[localStorage.getItem("monster") - 1]
       }
   }

   static async next(){
       const current = await this.getBoss();

       GoldService.add(Math.round(parseInt(current.health) / 10 + parseInt(current.strength) * 2));

       localStorage.setItem("monster", parseInt(localStorage.getItem("monster")) + 1);
   }
}

export default MonsterService;