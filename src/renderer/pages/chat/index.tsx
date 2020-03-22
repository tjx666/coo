import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Editor } from 'components';
import api, { Response } from 'api';
import { SendPrivateTextMessageResponse } from 'api/message';
import { RootState } from 'reducers';
import { addPrivateMessage } from 'reducers/message';
import { stickySession, MessageSituation } from 'reducers/session';
import { API_PREFIX } from 'utils/constants';

import MessageBoxHeader from './chatHeader';
import MessageList from './messageList';
import './style.scss';

export default function ChatSubPage() {
    const dispatch = useDispatch();

    const { profile, session: sessionState } = useSelector((state: RootState) => state);
    const currentSession = sessionState.currentSession!;
    const privateMessages = useSelector(
        (state: RootState) => state.message.privateChat[currentSession.id]?.messages || [],
    );

    const imageUploadAddress = `${API_PREFIX}/messages/private/image?${new URLSearchParams({
        from: profile.id,
        to: currentSession.id,
    })}`;

    // 滚动条滑倒最底部
    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            const list = document.querySelector<HTMLDivElement>('.chat-message-list')!;
            list.scrollTop = list.scrollHeight - list.clientHeight;
        });
    }, []);

    const sendTextMessage = useCallback(
        async (text: string) => {
            if (currentSession.situation === MessageSituation.PRIVATE) {
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
            }
            scrollToBottom();
            dispatch(stickySession({ id: currentSession.id, situation: currentSession.situation }));
        },
        [currentSession.id, currentSession.situation, profile.id, dispatch, scrollToBottom],
    );

    const handleSendImage = useCallback(
        (response: any) => {
            const { imageAddress, createdAt } = response.data;
            if (currentSession.situation === MessageSituation.PRIVATE) {
                dispatch(
                    addPrivateMessage({
                        id: currentSession.id,
                        self: true,
                        content: imageAddress,
                        contentType: 'image',
                        createdAt,
                    }),
                );
            }
            scrollToBottom();
            dispatch(stickySession({ id: currentSession.id, situation: currentSession.situation }));
        },
        [currentSession.id, currentSession.situation, dispatch, scrollToBottom],
    );

    return (
        <div className="chat-sub-page">
            <MessageBoxHeader name={currentSession.name} avatar={currentSession.avatar} />
            <MessageList className="chat-message-list" messages={privateMessages} />
            <Editor
                imageUploadAddress={imageUploadAddress}
                onEnter={sendTextMessage}
                onUploadImageSuccess={handleSendImage}
            />
        </div>
    );
}
