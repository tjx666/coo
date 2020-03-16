import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Editor } from 'components';
import { RootState } from 'reducers';
import { addPrivateMessage } from 'reducers/messages';
import { stickySession } from 'reducers/sessions';

import MessageBoxHeader from './chatHeader';
import MessageList from './messageList';
import './style.scss';

export default function ChatSubPage() {
    const dispatch = useDispatch();

    const currentSession = useSelector((state: RootState) => state.sessions.currentSession!);
    const privateMessages = useSelector(
        (state: RootState) => state.messages.privateChatMessages[currentSession.id]?.messages || [],
    );

    const handleSendTextMessage = useCallback(
        (text: string) => {
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
        [currentSession, dispatch],
    );

    return (
        <div className="chat-sub-page">
            <MessageBoxHeader name={currentSession.name} avatar={currentSession.avatar} />
            <MessageList className="chat-message-list" messages={privateMessages} />
            <Editor onEnter={handleSendTextMessage} />
        </div>
    );
}
