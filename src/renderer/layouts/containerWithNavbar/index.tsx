import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ProfilePage, MessagePage, ContactsPage } from 'pages';
import { Navbar } from 'components';

import './style.scss';

function ContainerWithNavbar() {
    return (
        <div className="container-with-navbar">
            <Navbar />
            <Switch>
                <Route path="/profile" component={ProfilePage} />
                <Route path="/message" component={MessagePage} />
                <Route path="/contacts" component={ContactsPage} />
            </Switch>
        </div>
    );
}

export default memo(ContainerWithNavbar);
