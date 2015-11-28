import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Greeting from "./components/greeting/greeting";

/*const app = document.createElement('div');
app.setAttribute("id", "root");
document.body.appendChild(app);*/

let rootElement = document.getElementById('root');

ReactDOM.render(
    <Greeting name="World"/>, rootElement
);