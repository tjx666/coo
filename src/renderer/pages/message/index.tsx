import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SessionList } from 'components';
import { RootState } from 'reducers';

import ChatSubPage from '../chat';
import './style.scss';

function MessagePage() {
    const sessionList = useSelector((state: RootState) => state.session.sessionList);
    const currentSession = useSelector((state: RootState) => state.session.currentSession);

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

export default memo(MessagePage);
