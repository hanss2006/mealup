import React, {Component} from "react";
import {Link} from "react-router-dom";

class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can edit list <Link to="/meal_up_backend_war/meals">here</Link>
                </div>
            </>
        )
    }
}

export default WelcomeComponent
