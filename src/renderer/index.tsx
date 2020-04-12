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

// 一些全局的项目配置
window.COO = {
    theme: {
        primaryColor: 'rgb(56, 115, 254)',
    },
};

if (process.env.NODE_ENV === 'development') {
    // 初始化 debug 工具方法
    window.COO_DEBUG = {
        j(path = '/login') {
            window.location.href = path;
        },
        resetMessages() {
            store.dispatch({ type: 'message/resetMessages' });
        },
    };

    if (module.hot) {
        module.hot.accept('./app', render);
    }
}
