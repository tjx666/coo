import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '@/socket';
import { Editor } from 'components';
import api, { Response } from 'api';
import { GetUserResponse } from 'api/user';
import { RootState } from 'reducers';
import { addPrivateMessage } from 'reducers/message';
import { stickySession, addSession } from 'reducers/session';

import MessageBoxHeader from './chatHeader';
import MessageList from './messageList';
import './style.scss';

export default function ChatSubPage() {
    const dispatch = useDispatch();

    const { profile, session: sessionState } = useSelector((state: RootState) => state);
    const currentSession = sessionState.currentSession!;
    const { sessionList } = sessionState;
    const privateMessages = useSelector(
        (state: RootState) => state.message.privateChat[currentSession.id]?.messages || [],
    );

    useEffect(() => {
        const handleMessage = async (data: any) => {
            if (data.contentType === 'text') {
                const { from, content } = data;
                if (sessionList.every(session => session.id !== from)) {
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
                        }),
                    );
                }

                dispatch(
                    addPrivateMessage({
                        id: from,
                        content,
                        self: false,
                        timestamp: Date.now(),
                    }),
                );
                dispatch(stickySession(from));
            }
        };
        socket.on('message', handleMessage);
        return () => {
            socket.off('message', handleMessage);
        };
    }, [dispatch, sessionList]);

    const handleSendTextMessage = useCallback(
        async (text: string) => {
            try {
                await api('sendPrivateTextMessage', {
                    data: {
                        from: profile.id,
                        to: currentSession.id,
                        content: text,
                    },
                });
            } catch (error) {
                console.error('发送失败！');
                console.error(error);
                return;
            }

            dispatch(
                addPrivateMessage({
                    id: currentSession!.id,
                    self: true,
                    content: text,
                    timestamp: Date.now(),
                }),
            );
            dispatch(stickySession(currentSession.id));
            setTimeout(() => {
                const list = document.querySelector<HTMLDivElement>('.chat-message-list')!;
                list.scrollTop = list.scrollHeight - list.clientHeight;
            });
        },
        [currentSession, dispatch, profile.id],
    );

    return (
        <div className="chat-sub-page">
            <MessageBoxHeader name={currentSession.name} avatar={currentSession.avatar} />
            <MessageList className="chat-message-list" messages={privateMessages} />
            <Editor onEnter={handleSendTextMessage} />
        </div>
    );
}
