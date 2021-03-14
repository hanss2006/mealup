import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

class MealUp extends Component {
    render() {
        return (
            <div className='MealUp'>
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route exact path="/" component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent}/>
                        <Route path="/meals" component={ListMealComponent}/>
                        <Route path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://localhost:3000/" className="navbar-brand">Meal up</a> </div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/">Home</Link></li>
                        <li><Link className="nav-link" to="/meals">Meals</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You!
                </div>
            </>
        )
    }
}

class ListMealComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals:
                [
                    {id: 1, description: 'Potato', calories: 100, mealDate: new Date()},
                    {id: 2, description: 'Beans', calories: 50, mealDate: new Date()},
                    {id: 3, description: 'Sandwich', calories: 150, mealDate: new Date()}
                ]
        }
    }

    render() {
        return (
            <table style={{ captionSide: 'top' }}>
                <caption>Meal list</caption>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Description</th>
                    <th>Calories</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.meals.map(
                        (meal, i) =>
                            <tr>
                                <td>{meal.id}</td>
                                <td>{meal.description}</td>
                                <td>{meal.calories}</td>
                                <td>{meal.mealDate.toString()}</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        )
    }
}

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                Welcome {this.props.match.params.name}.
                You can edit list <Link to="/meals">here</Link>
            </div>
            )
    }
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'user',
            password: 'password',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handlerChange(event) {
        console.log(this.state);
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    render() {
        return (
            <section>
                {this.state.hasLoginFailed && <div>Invalid credentials</div>}
                {this.state.showSuccessMessage && <div>Login successful</div>}
                User name: <input type="text" name="username" value={this.state.username}
                                  onChange={this.handlerChange}/>
                Password: <input type="password" name="password" value={this.state.password}
                                 onChange={this.handlerChange}/>
                <button onClick={this.loginClicked} className="btn btn-success">Login</button>
            </section>
        )
    }

    loginClicked() {
        if (this.state.username === 'user' && this.state.password === 'password') {
            this.setState({showSuccessMessage: true})
            this.setState({hasLoginFailed: false})
            this.props.history.push(`/welcome/${this.state.username}`);
        } else {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        }
    }
}

function ErrorComponent() {
    return (<div>Error ocured</div>)
}

export default MealUp