import { hot } from 'react-hot-loader/root';
import React, { memo, useEffect, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterPage, LoginPage } from 'pages';
import { moveMessageListScrollBarToBottom } from 'pages/chat';
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

    const sessionList = useSelector((state: RootState) => state.session.sessionList);
    const friendList = useSelector((state: RootState) => state.friend.friendList);
    const groupList = useSelector((state: RootState) => state.group.groupList);

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
                            latestMessage: content,
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
                            latestMessage: '图片',
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
            moveMessageListScrollBarToBottom();
            dispatch(stickySession({ id: from, situation }));
            if (window.location.pathname !== '/message/chat') history.push('/message/chat');
        },
        [dispatch, history, sessionList, friendList, groupList],
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

export default hot(memo(App));
