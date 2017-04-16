import React from 'react';
import styles from './greeting.scss'
const config = require('appconfig');

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    render() {
        var imgSmall = '<img src="' + require("./react-logo-small.png") + '" />';
        var imgBig = '<img src="' + require("./react-logo-big.png") + '" />';

        var imgSmallSrc = require("./react-logo-small.png");
        var imgBigSrc = require("./react-logo-big.png");

        return (
            <div className="greeting">
                <h1>Hello, {this.props.name}!</h1>

                <p>
                    Config example: config.HELLO_WORLD: {config.HELLO_WORLD}
                </p>

                <p>
                    Small inlined logo: <br/>
                    {imgSmall} <br/>
                    <img src={imgSmallSrc} alt=""/>
                </p>

                <p>
                    Big logo inside the resources folder <br/>
                    {imgBig} <br/>
                    <img src={imgBigSrc} alt=""/>
                </p>
            </div>
        );
    }
}
