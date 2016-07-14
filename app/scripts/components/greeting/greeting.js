import React from 'react';
import './greeting.scss'

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    render() {
        return (
            <div className="greeting">
                <h1>Hello, {this.props.name}!</h1>
            </div>
        );
    }
}
