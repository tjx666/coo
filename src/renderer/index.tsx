/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

function render() {
    const App = require('./app').default;

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.querySelector('#root'),
    );
}
render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    window.j = (path = '/message') => {
        window.location.href = path;
    };
    window.theme = {
        primaryColor: 'rgb(56, 115, 254)',
    };
    // require('devtron').install();
    module.hot.accept('./app', render);
}
