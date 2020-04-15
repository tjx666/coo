import React, { useCallback, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'reducers';
import { PrivateMessageItem, GroupMessageItem } from 'reducers/message';
import { MessageSituation } from 'reducers/session';

import MessageItem from './messageItem';
import './style.scss';

interface MessageListProps {
    className?: string;
    messages: Array<PrivateMessageItem | GroupMessageItem>;
}

function MessageList({ className, messages }: MessageListProps) {
    const loginUserName = useSelector((state: RootState) => state.profile.name);
    const loginUserAvatar = useSelector((state: RootState) => state.profile.avatar);
    const currentSession = useSelector((state: RootState) => state.session.currentSession!);

    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            window.getSelection()?.empty();
        }
    }, []);

    const messageList = useMemo(
        () =>
            messages.map((message) => {
                const { self } = message;
                if (currentSession.situation === MessageSituation.PRIVATE) {
                    const privateMessage = message as PrivateMessageItem;
                    return (
                        <MessageItem
                            key={privateMessage.createdAt}
                            name={self ? loginUserName : currentSession.name}
                            avatar={self ? loginUserAvatar : currentSession.avatar}
                            content={privateMessage.content}
                            type={privateMessage.contentType}
                            right={self}
                        />
                    );
                }

                const groupMessage = message as GroupMessageItem;
                return (
                    <MessageItem
                        key={groupMessage.createdAt}
                        name={self ? loginUserName : groupMessage.name}
                        avatar={self ? loginUserAvatar : groupMessage.avatar}
                        content={groupMessage.content}
                        type={groupMessage.contentType}
                        right={self}
                    />
                );
            }),
        [
            currentSession.avatar,
            currentSession.name,
            currentSession.situation,
            loginUserAvatar,
            loginUserName,
            messages,
        ],
    );

    return (
        <div className={`message-list ${className ?? ''}`} onClick={handleClick}>
            {messageList}
        </div>
    );
}

export default memo(MessageList);
