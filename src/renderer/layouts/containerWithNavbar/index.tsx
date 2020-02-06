import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MessagePage, ProfilePage } from 'pages';
import { Navbar } from 'components';

import './style.scss';

export default function ContainerWithNavbar() {
    return (
        <div className="container-with-navbar">
            <Navbar />
            <Switch>
                <Route path="/message" component={MessagePage} />
                <Route path="/profile" component={ProfilePage} />
            </Switch>
        </div>
    );
}
