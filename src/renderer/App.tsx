import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Sidebar } from 'components';
import './App.scss';

const App = () => {
    return (
        <div className="app">
            <Sidebar />
        </div>
    );
};

export default hot(App);
