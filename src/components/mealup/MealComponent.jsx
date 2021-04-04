import React, {Component} from 'react'
import moment from "moment";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import MealDataService from "../../api/mealup/MealDataService";
import AuthenticationService from "./AuthenticationService";

class MealComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            mealDate: moment(new Date()).format('YYYY-MM-YY'),
            calories: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        }
        let username = AuthenticationService.getLoggedInUserName();
        MealDataService.retrieveMeal(username, this.state.id)
            .then(response => this.setState(
                {
                    description: response.data.description,
                    mealDate: moment(response.data.mealDate).format('YYYY-MM-DD'),
                    calories: response.data.calories
                }
            ));
    }

    validate(values){
        let errors = {};
        if(!values.description){
            errors.description = 'Enter a description';
        }
        if(!moment(values.mealDate).isValid()){
            errors.mealDate = 'Enter a valid target date';
        }
        return errors;
    }

    onSubmit(values){
        let username = AuthenticationService.getLoggedInUserName();
        let meal = {
            id: this.state.id,
            description: values.description,
            mealDate: values.mealDate,
            calories: values.calories
        }

        if (this.state.id === -1) {
            MealDataService.createMeal(username, meal)
                .then(() => this.props.history.push('/meal_up_backend_war/meals'));
        } else {
            MealDataService.updateMeal(username, this.state.id, meal)
                .then(() => this.props.history.push('/meal_up_backend_war/meals'));
        }
    }

    render() {
        let {description, mealDate, calories} = this.state;
        return (
            <div>
                <h1>Meal</h1>
                <div className='container'>
                    <Formik
                        initialValues={{description, mealDate, calories}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="mealDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Date</label>
                                        <Field className="form-control" type="date" name="mealDate"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Calories</label>
                                        <Field className="form-control" type="text" name="calories"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default MealComponent
