import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import ListMealComponent from "./ListMealComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent  from "./FooterComponent.jsx";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import MealComponent from "./MealComponent";

class MealUp extends Component {
    render() {
        return (
            <div className='MealUp'>
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route exact path="/meal_up_backend_war/" component={LoginComponent}/>
                        <Route path="/meal_up_backend_war/login" component={LoginComponent}/>
                        <AuthenticatedRoute path="/meal_up_backend_war/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/meal_up_backend_war/meals/:id" component={MealComponent}/>
                        <AuthenticatedRoute path="/meal_up_backend_war/meals" component={ListMealComponent}/>
                        <AuthenticatedRoute path="/meal_up_backend_war/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

export default MealUp
