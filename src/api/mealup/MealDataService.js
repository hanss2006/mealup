import axios from "axios";
import {API_URL} from "../../Constants";

class MealDataService {
    retrieveAllMeals(name){
        return axios.get(`${API_URL}/users/${name}/meals`);
    }

    retrieveMeal(name, id){
        return axios.get(`${API_URL}/users/${name}/meals/${id}`);
    }

    deleteMeal(name, id){
        return axios.delete(`${API_URL}/users/${name}/meals/${id}`);
    }

    updateMeal(name, id, meal){
        return axios.put(`${API_URL}/users/${name}/meals/${id}`, meal);
    }

    createMeal(name, meal){
        return axios.post(`${API_URL}/users/${name}/meals/`, meal);
    }


}

export default new MealDataService()