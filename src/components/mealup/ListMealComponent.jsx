import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import MealDataService from "../../api/mealup/MealDataService";
import moment from 'moment';


class ListMealComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals:
                [
/*
                    {id: 1, description: 'Potato', calories: 100, mealDate: new Date()},
                    {id: 2, description: 'Beans', calories: 50, mealDate: new Date()},
                    {id: 3, description: 'Sandwich', calories: 150, mealDate: new Date()}
*/
                ]
        }
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        MealDataService.retrieveAllMeals(username).then(
            response => {
                this.setState({meals : response.data})
            }
        )
    }

    render() {
        return (
            <>
                <h1>Meal list</h1>
                <div className="container">
                    <table className="table" style={{captionSide: 'top'}}>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Calories</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.meals.map(
                                (meal, i) =>
                                    <tr key={meal.id}>
                                        <td>{meal.description}</td>
                                        <td>{meal.calories}</td>
                                        <td>{moment(meal.mealDate).format('DD.MM.YYYY')}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default ListMealComponent