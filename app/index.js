import React from 'react';
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader'; // AppContainer is a necessary wrapper component for HMR

import Main from './components/main';

let rootElement = document.getElementById('root');

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Main />
        </AppContainer>,
        rootElement
    );
};

render();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/main', render);
}
