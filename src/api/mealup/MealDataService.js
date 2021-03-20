import axios from "axios";

class MealDataService {
    retrieveAllMeals(name){
        return axios.get(`http://localhost:8080/users/${name}/meals`);
    }
}

export default new MealDataService()