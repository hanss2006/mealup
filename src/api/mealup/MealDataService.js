import axios from "axios";

class MealDataService {
    retrieveAllMeals(name){
        return axios.get(`http://localhost:8080/users/${name}/meals`);
    }

    retrieveMeal(name, id){
        return axios.get(`http://localhost:8080/users/${name}/meals/${id}`);
    }

    deleteMeal(name, id){
        return axios.delete(`http://localhost:8080/users/${name}/meals/${id}`);
    }

    updateMeal(name, id, meal){
        return axios.put(`http://localhost:8080/users/${name}/meals/${id}`, meal);
    }

    createMeal(name, meal){
        return axios.post(`http://localhost:8080/users/${name}/meals/`, meal);
    }


}

export default new MealDataService()