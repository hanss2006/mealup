import axios from "axios";
import {JPA_API_URL} from "../../Constants";

class MealDataService {
    retrieveAllMeals(name){
        return axios.get(`${JPA_API_URL}/users/${name}/meals`);
    }

    retrieveMeal(name, id){
        return axios.get(`${JPA_API_URL}/users/${name}/meals/${id}`);
    }

    deleteMeal(name, id){
        return axios.delete(`${JPA_API_URL}/users/${name}/meals/${id}`);
    }

    updateMeal(name, id, meal){
        return axios.put(`${JPA_API_URL}/users/${name}/meals/${id}`, meal);
    }

    createMeal(name, meal){
        return axios.post(`${JPA_API_URL}/users/${name}/meals/`, meal);
    }


}

export default new MealDataService()