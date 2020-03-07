import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { RegisterPage, LoginPage } from 'pages';
import { ContainerWithNavbar } from 'layouts';
import { fetchUserInfo } from 'reducers/user';

import './app.scss';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const { href } = window.location;
        if (!href.endsWith('/login') && !href.endsWith('/register')) {
            dispatch(fetchUserInfo());
        }
    }, [dispatch]);

    return (
        <div className="app">
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/profile" component={ContainerWithNavbar} />
                <Route path="/message" component={ContainerWithNavbar} />
                <Route path="/contacts" component={ContainerWithNavbar} />
                <Redirect to="/login" />
            </Switch>
        </div>
    );
}

export default hot(App);
