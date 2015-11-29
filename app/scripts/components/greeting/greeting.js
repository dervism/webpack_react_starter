import React, { Component } from 'react';
import './greeting.scss'

export default class Greeting extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    componentWillUnmount() {

    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="greeting">
                <h1>Hello, {this.props.name}!</h1>
            </div>
        );
    }
}
