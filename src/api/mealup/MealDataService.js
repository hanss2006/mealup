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
}

export default new MealDataService()