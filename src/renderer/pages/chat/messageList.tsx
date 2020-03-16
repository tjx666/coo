import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { PrivateMessageItem } from 'reducers/messages';

import MessageItem from './messageItem';
import './style.scss';

interface MessageListProps {
    className?: string;
    messages: PrivateMessageItem[];
}

export default function MessageList({ className, messages }: MessageListProps) {
    const user = useSelector((state: RootState) => state.user);
    const currentSession = useSelector((state: RootState) => state.sessions.currentSession)!;

    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            window.getSelection()?.empty();
        }
    }, []);

    const messageList = useMemo(
        () =>
            messages.map(message => {
                const { self } = message;
                return (
                    <MessageItem
                        key={message.timestamp}
                        name={self ? user.name : currentSession.name}
                        avatar={self ? user.avatar : currentSession.avatar}
                        content={message.content}
                        right={self}
                    />
                );
            }),
        [currentSession.avatar, currentSession.name, messages, user.avatar, user.name],
    );

    return (
        <div className={`message-list ${className || ''}`} onClick={handleClick}>
            {messageList}
        </div>
    );
}
