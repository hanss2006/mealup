import React, {Component} from 'react'

class MealComponent extends Component {
    render() {
        return (
            <div>Meal Component {this.props.match.params.id}</div>
        )
    }
}

export default MealComponent