import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { SessionList } from 'components';
import { RootState } from 'reducers';
import {} from 'reducers/session';

import ChatSubPage from '../chat';
import './style.scss';

export default function MessagePage() {
    const { sessionList, currentSession } = useSelector((state: RootState) => state.session);
    return (
        <main className="message-page">
            <SessionList sessions={sessionList} activeItemId={currentSession?.id} />
            <div className="message-page-main">
                <Switch>
                    <Route path="/message/:id/chat" component={ChatSubPage} />
                </Switch>
            </div>
        </main>
    );
}
