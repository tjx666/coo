import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import api, { Response } from 'api';
import { SendPrivateTextMessageResponse, SendGroupTextMessageResponse } from 'api/message';
import { Editor } from 'components';
import { RootState } from 'reducers';
import { addPrivateMessage, addGroupMessage } from 'reducers/message';
import { stickySession } from 'reducers/session';
import { API_PREFIX } from 'utils/constants';

import MessageBoxHeader from './chatHeader';
import MessageList from './messageList';
import './style.scss';

// 将消息列表滚动条滑倒最底部
export function moveMessageListScrollBarToBottom() {
    setTimeout(() => {
        const list = document.querySelector<HTMLDivElement>('.chat-message-list')!;
        list.scrollTop = list.scrollHeight - list.clientHeight;
    });
}

const selectMessages = createSelector(
    [(state: RootState) => state.message, (state: RootState) => state.session.currentSession!],
    (messageState, currentSession) => {
        const { id } = currentSession;
        return (
            (currentSession.situation === 'private'
                ? messageState.privateChat[id]?.messages
                : messageState.groupChat[id]?.messages) ?? []
        );
    },
);

function ChatSubPage() {
    const dispatch = useDispatch();

    const currentSession = useSelector((state: RootState) => state.session.currentSession!);
    const profile = useSelector((state: RootState) => state.profile);
    const messages = useSelector(selectMessages);

    const imageUploadAddress = `${API_PREFIX}/messages/${
        currentSession.situation
    }/image?${new URLSearchParams({
        from: profile.id,
        to: currentSession.id,
    })}`;

    const sendTextMessage = useCallback(
        async (text: string) => {
            if (currentSession.situation === 'private') {
                let response: Response<SendPrivateTextMessageResponse> | undefined;
                try {
                    response = await api('sendPrivateTextMessage', {
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
                        id: currentSession.id,
                        self: true,
                        content: text,
                        contentType: 'text',
                        createdAt: response.data.data.createdAt,
                    }),
                );
            } else if (currentSession.situation === 'group') {
                let response: Response<SendGroupTextMessageResponse> | undefined;
                try {
                    response = await api('sendGroupTextMessage', {
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
                    addGroupMessage({
                        id: currentSession.id,
                        name: profile.name,
                        avatar: profile.avatar,
                        from: profile.id,
                        self: true,
                        content: text,
                        contentType: 'text',
                        createdAt: response.data.data.createdAt,
                    }),
                );
            }
            moveMessageListScrollBarToBottom();
            dispatch(stickySession({ id: currentSession.id, situation: currentSession.situation }));
        },
        [
            dispatch,
            currentSession.id,
            currentSession.situation,
            profile.avatar,
            profile.id,
            profile.name,
        ],
    );

    const handleSendImage = useCallback(
        (response: any) => {
            const { imageAddress, createdAt } = response.data;
            if (currentSession.situation === 'private') {
                dispatch(
                    addPrivateMessage({
                        id: currentSession.id,
                        self: true,
                        content: imageAddress,
                        contentType: 'image',
                        createdAt,
                    }),
                );
            } else if (currentSession.situation === 'group') {
                dispatch(
                    addGroupMessage({
                        id: currentSession.id,
                        name: profile.name,
                        avatar: profile.avatar,
                        from: profile.id,
                        self: true,
                        content: imageAddress,
                        contentType: 'image',
                        createdAt,
                    }),
                );
            }
            moveMessageListScrollBarToBottom();
            dispatch(stickySession({ id: currentSession.id, situation: currentSession.situation }));
        },
        [
            dispatch,
            currentSession.id,
            currentSession.situation,
            profile.avatar,
            profile.id,
            profile.name,
        ],
    );

    return (
        <div className="chat-sub-page">
            <MessageBoxHeader
                id={currentSession.id}
                name={currentSession.name}
                avatar={currentSession.avatar}
            />
            <MessageList className="chat-message-list" messages={messages} />
            <Editor
                imageUploadAddress={imageUploadAddress}
                onEnter={sendTextMessage}
                onUploadImageSuccess={handleSendImage}
            />
        </div>
    );
}

export default memo(ChatSubPage);
