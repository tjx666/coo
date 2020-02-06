import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RegisterPage, LoginPage } from 'pages';
import { ContainerWithNavbar } from 'layouts';

import './App.scss';

function App() {
    return (
        <div className="app">
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/message" component={ContainerWithNavbar} />
                <Route path="/profile" component={ContainerWithNavbar} />
                <Redirect to="/message" />
            </Switch>
        </div>
    );
}

export default hot(App);
