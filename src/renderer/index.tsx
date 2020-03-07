import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

function render() {
    // eslint-disable-next-line global-require
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

    module.hot.accept('./app', render);
}
