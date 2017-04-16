import React from 'react';
import Greeting from '../greeting'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>React and Webpack Template!</h1>
                <Greeting name="World world" />
                <h5>Version: {VERSION}</h5>
            </div>
        );
    }
}
