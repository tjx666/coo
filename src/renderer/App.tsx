import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RegisterPage, LoginPage, MessagePage } from 'pages';

import './App.scss';

const App = () => {
    return (
        <div className="app">
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/message" component={MessagePage} />
                <Redirect to="/message" />
            </Switch>
        </div>
    );
};

export default hot(App);
