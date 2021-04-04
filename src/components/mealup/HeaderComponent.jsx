import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import {Link} from "react-router-dom";

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://localhost:8080/meal_up_backend_war" className="navbar-brand">Meal up</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/meal_up_backend_war/">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/meal_up_backend_war/meals">Meals</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/meal_up_backend_war/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/meal_up_backend_war/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent
