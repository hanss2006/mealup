import React, {Component} from 'react'

class MealUp extends Component {
    render() {
        return (
            <div className='MealUp'>
                <LoginComponent/>
            </div>
        )
    }
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'user',
            password: 'password'
        }
        this.handlerUsernameChange=this.handlerUsernameChange.bind(this);
        this.handlerPasswordChange=this.handlerPasswordChange.bind(this);
    }

    handlerUsernameChange(event){
        this.setState(
            {
                username: event.target.value,
                password: this.state.password
            }
        )
    }

    handlerPasswordChange(event){
        this.setState(
            {
                username: this.state.username,
                password: event.target.value
            }
        )
    }

    render() {
        return (
            <section>
              User name: <input type="text" name="username" value={this.state.username} onChange={this.handlerUsernameChange}/>
              Password: <input type="password" name="paswword" value={this.state.password} onChange={this.handlerPasswordChange}/>
              <button className="btn btn-success">Login</button>
            </section>
        )
    }
}

export default MealUp