import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Sidebar } from 'components';
import { Register } from 'pages';

import './App.scss';

const App = () => {
    return (
        <div className="app">
            <Sidebar />
            <main>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Redirect to="/register" />
                </Switch>
            </main>
        </div>
    );
};

export default hot(App);
