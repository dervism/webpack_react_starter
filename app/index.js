import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Router, Route } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import Main from './components/main';

import rootSaga from './sagas';
import { history, configureStore } from './store';

// setup redux & saga:
const store = configureStore();
store.runSaga(rootSaga);

let rootElement = document.getElementById('root');

const render = Component => {
    ReactDOM.render(
        <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <BrowserRouter basename={CONTEXTPATH}>
              <Route path="*" component={Component} />
            </BrowserRouter>
          </ConnectedRouter>
        </Provider>
        </AppContainer>,
        rootElement
    );
};

render(Main);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/main', () => { render(Main) });
}
