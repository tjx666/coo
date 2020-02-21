import 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

if (process.env.NODE_ENV === 'development') {
    window.j = (path = '/message') => {
        window.location.href = path;
    };
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
