import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';

import store, { persistor } from './store';
import './socket';

function render() {
    // eslint-disable-next-line global-require
    const App = require('./app').default;
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={<Spin />} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
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

    module.hot.accept('./app', render);
}
