import React, { useCallback, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { PrivateMessageItem, GroupMessageItem } from 'reducers/message';

import MessageItem from './messageItem';
import './style.scss';

interface MessageListProps {
    className?: string;
    messages: Array<PrivateMessageItem | GroupMessageItem>;
}

function MessageList({ className, messages }: MessageListProps) {
    const { name: loginUserName, avatar: loginUserAvatar } = useSelector(
        (state: RootState) => state.profile,
    );
    const { name: oppositeUserName, avatar: oppositeUserAvatar } = useSelector(
        (state: RootState) => state.session.currentSession,
    )!;

    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            window.getSelection()?.empty();
        }
    }, []);

    const messageList = useMemo(
        () =>
            messages.map((message) => {
                const { self } = message;
                return (
                    <MessageItem
                        key={message.createdAt}
                        name={self ? loginUserName : oppositeUserName}
                        avatar={self ? loginUserAvatar : oppositeUserAvatar}
                        content={message.content}
                        type={message.contentType}
                        right={self}
                    />
                );
            }),
        [messages, loginUserAvatar, loginUserName, oppositeUserAvatar, oppositeUserName],
    );

    return (
        <div className={`message-list ${className || ''}`} onClick={handleClick}>
            {messageList}
        </div>
    );
}

export default memo(MessageList);
