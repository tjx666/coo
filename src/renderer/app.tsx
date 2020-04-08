import { hot } from 'react-hot-loader/root';
import React, { useEffect, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterPage, LoginPage } from 'pages';
import { scrollToBottom } from 'pages/chat';
import { ContainerWithNavbar } from 'layouts';
import { RootState } from 'reducers';
import { fetchProfile } from 'reducers/profile';
import { addPrivateMessage, addGroupMessage } from 'reducers/message';
import { addSession, stickySession, MessageSituation } from 'reducers/session';

import socket from './socket';
import './app.scss';

function App() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { sessionList } = useSelector((state: RootState) => state.session);
    const { friendList } = useSelector((state: RootState) => state.friend);
    const { groupList } = useSelector((state: RootState) => state.group);

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
            const { from, fromUser, groupId, situation, content, contentType, createdAt } = data;
            const digest = contentType === 'text' ? content.slice(0, 20) : '图片';
            if (situation === 'private') {
                const sessionExisted = sessionList.some(
                    (session) =>
                        session.id === from && session.situation === MessageSituation.PRIVATE,
                );
                if (!sessionExisted) {
                    const friend = friendList.find((item) => item.id === from)!;
                    dispatch(
                        addSession({
                            id: from,
                            name: friend.name,
                            avatar: friend.avatar,
                            digest,
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
            } else if (situation === 'group') {
                const sessionExisted = sessionList.some(
                    (session) =>
                        session.id === from && session.situation === MessageSituation.GROUP,
                );
                const group = groupList.find((item) => item.id === groupId)!;
                if (!sessionExisted) {
                    dispatch(
                        addSession({
                            id: groupId,
                            name: group.name,
                            avatar: group.avatar,
                            digest,
                            situation,
                            updatedAt: createdAt,
                        }),
                    );
                }

                dispatch(
                    addGroupMessage({
                        id: group.id,
                        name: fromUser.name,
                        avatar: fromUser.avatar,
                        from,
                        content,
                        self: false,
                        contentType,
                        createdAt,
                    }),
                );
            }
            scrollToBottom();
            dispatch(stickySession({ id: from, situation }));
            history.push('/message/chat');
        },
        [dispatch, friendList, groupList, history, sessionList],
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
                <Redirect to="/message" />
            </Switch>
        </div>
    );
}

export default hot(App);
