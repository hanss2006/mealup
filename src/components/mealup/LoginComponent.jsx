import React, {Component} from 'react'
import AuthenticationService from "./AuthenticationService";

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
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                    {this.state.showSuccessMessage && <div>Login successful</div>}
                    User name: <input type="text" name="username" value={this.state.username}
                                      onChange={this.handlerChange}/>
                    Password: <input type="password" name="password" value={this.state.password}
                                     onChange={this.handlerChange}/>
                    <button onClick={this.loginClicked} className="btn btn-success">Login</button>
                </div>
            </>
        )
    }

    loginClicked() {
/*        if (this.state.username === 'user' && this.state.password === 'password') {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`);
            /!*
                        this.setState({showSuccessMessage: true})
                        this.setState({hasLoginFailed: false})
            *!/
        } else {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        }*/
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/meal_up_backend_war/welcome/${this.state.username}`)
            }).catch(() => {
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        })

    }
}

export default LoginComponent
