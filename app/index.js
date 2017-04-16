import React from 'react';
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';

import Main from './components/main';

let rootElement = document.getElementById('root');

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootElement
    );
};

render(Main);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/main', () => { render(Main) });
}
