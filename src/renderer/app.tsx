import { hot } from 'react-hot-loader/root';
import React, { useEffect, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterPage, LoginPage } from 'pages';
import { ContainerWithNavbar } from 'layouts';
import api, { Response } from 'api';
import { GetUserResponse } from 'api/user';
import { RootState } from 'reducers';
import { fetchProfile } from 'reducers/profile';
import { addPrivateMessage } from 'reducers/message';
import { addSession, stickySession, MessageSituation } from 'reducers/session';

import socket from './socket';
import './app.scss';

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { sessionList } = useSelector((state: RootState) => state.session);

    // 同步用户信息
    useEffect(() => {
        const { href } = window.location;
        if (!href.endsWith('/login') && !href.endsWith('/register')) {
            dispatch(fetchProfile());
        }
    }, [dispatch]);

    // 处理服务端推送的消息
    const handleChatMessage = useCallback(
        async (data: any) => {
            const { from, situation, content, contentType, createdAt } = data;
            if (situation === 'private') {
                const sessionNotExisted = sessionList.every(
                    (session) =>
                        session.id !== from || session.situation !== MessageSituation.PRIVATE,
                );
                if (sessionNotExisted) {
                    let resp: Response<GetUserResponse> | undefined;
                    try {
                        resp = await api<GetUserResponse>('getUser', { pathParams: { id: from } });
                    } catch (error) {
                        console.error(error);
                        return;
                    }

                    const friend = resp.data.data;
                    dispatch(
                        addSession({
                            id: from,
                            name: friend.name,
                            digest: content.slice(0, 20),
                            situation,
                            updatedAt: createdAt,
                        }),
                    );
                }

                dispatch(
                    addPrivateMessage({
                        id: from,
                        content,
                        self: false,
                        contentType,
                        createdAt,
                    }),
                );
                history.push('/message/chat');
            }
            dispatch(stickySession({ id: from, situation }));
        },
        [dispatch, history, sessionList],
    );

    useEffect(() => {
        socket.on('chat', handleChatMessage);
        return () => {
            socket.off('chat', handleChatMessage);
        };
    }, [handleChatMessage]);

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
