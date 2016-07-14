import React from 'react';
import ReactDOM from "react-dom";
import Greeting from "./components/greeting/greeting";

let rootElement = document.getElementById('root');

ReactDOM.render(
    <Greeting name="World" />, rootElement
);