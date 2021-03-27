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
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        MealDataService.retrieveMeal(username, this.state.id)
            .then(response => this.setState(
                {
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                }
            ));
    }

    validate(values){
        let errors = {};
        if(!values.description){
            errors.description = 'Enter a description';
        }
        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a valid target date';
        }
        return errors;
    }

    onSubmit(values){
        console.log(values);
    }

    render() {
        let {description, targetDate} = this.state;
        return (
            <div>
                <h1>Meal</h1>
                <div className='container'>
                    <Formik
                        initialValues={{description, targetDate}}
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
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
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