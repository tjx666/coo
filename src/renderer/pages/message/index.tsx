import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SessionList } from 'components';

import ChatSubPage from '../chat';
import './style.scss';

export default function MessagePage() {
    return (
        <main className="message-page">
            <SessionList />
            <div className="message-page-main">
                <Switch>
                    <Route path="/message/:id/chat" component={ChatSubPage} />
                </Switch>
            </div>
        </main>
    );
}
