import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import MealDataService from "../../api/mealup/MealDataService";
import moment from 'moment';


class ListMealComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            message: null
        }
        this.updateMealClicked = this.updateMealClicked.bind(this);
        this.deleteMealClicked = this.deleteMealClicked.bind(this);
        this.refreshMeals = this.refreshMeals.bind(this);
        this.addMealClicked = this.addMealClicked.bind(this);
    }

    componentDidMount() {
        this.refreshMeals();
    }

    updateMealClicked(id){
        this.props.history.push(`/meals/${id}`);
    }

    addMealClicked(){
        this.props.history.push(`/meals/-1`);
    }


    deleteMealClicked(id){
        let username = AuthenticationService.getLoggedInUserName();
        MealDataService.deleteMeal(username, id)
            .then(
                response => {
                    this.setState({message : `Delete of meal ${id}`});
                    this.refreshMeals();
                }
            )
    }

    refreshMeals(){
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
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table" style={{captionSide: 'top'}}>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Calories</th>
                            <th>Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.meals.map(
                                (meal, i) =>
                                    <tr key={meal.id}>
                                        <td>{meal.description}</td>
                                        <td>{meal.calories}</td>
                                        <td>{moment(meal.mealDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={()=> this.updateMealClicked(meal.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={()=> this.deleteMealClicked(meal.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addMealClicked}>Add</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ListMealComponent