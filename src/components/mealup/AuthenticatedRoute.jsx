import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import {Route, Redirect} from "react-router-dom";

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/meal_up_backend_war/login"/>
        }
    }
}

export default AuthenticatedRoute
