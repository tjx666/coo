import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SessionList } from 'components';
import { RootState } from 'reducers';

import ChatSubPage from '../chat';
import './style.scss';

export default function MessagePage() {
    const { sessionList, currentSession } = useSelector((state: RootState) => state.session);
    return (
        <main className="message-page">
            <SessionList sessions={sessionList} activeItemId={currentSession?.id} />
            <div className="message-page-main">
                <Switch>
                    <Route path="/message/chat" component={ChatSubPage} />
                </Switch>
            </div>
        </main>
    );
}
