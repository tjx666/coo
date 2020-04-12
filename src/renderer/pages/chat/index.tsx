import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Editor } from 'components';
import api, { Response } from 'api';
import { SendPrivateTextMessageResponse, SendGroupTextMessageResponse } from 'api/message';
import { RootState } from 'reducers';
import { addPrivateMessage, addGroupMessage } from 'reducers/message';
import { stickySession, MessageSituation } from 'reducers/session';
import { API_PREFIX } from 'utils/constants';

import MessageBoxHeader from './chatHeader';
import MessageList from './messageList';
import './style.scss';

// 滚动条滑倒最底部
export function scrollToBottom() {
    setTimeout(() => {
        const list = document.querySelector<HTMLDivElement>('.chat-message-list')!;
        list.scrollTop = list.scrollHeight - list.clientHeight;
    });
}

function ChatSubPage() {
    const dispatch = useDispatch();

    const profile = useSelector((state: RootState) => state.profile);
    const currentSession = useSelector((state: RootState) => state.session.currentSession!);
    const messages = useSelector((state: RootState) => {
        const messageState = state.message;
        const { id } = currentSession;
        return (
            (currentSession.situation === MessageSituation.PRIVATE
                ? messageState.privateChat[id]?.messages
                : messageState.groupChat[id]?.messages) || []
        );
    }, shallowEqual);

    const imageUploadAddress = `${API_PREFIX}/messages/${
        currentSession.situation
    }/image?${new URLSearchParams({
        from: profile.id,
        to: currentSession.id,
    })}`;

    const sendTextMessage = async (text: string) => {
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
        } else if (currentSession.situation === MessageSituation.GROUP) {
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
        scrollToBottom();
        dispatch(stickySession({ id: currentSession.id, situation: currentSession.situation }));
    };

    const handleSendImage = (response: any) => {
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
        } else if (currentSession.situation === MessageSituation.GROUP) {
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
        scrollToBottom();
        dispatch(stickySession({ id: currentSession.id, situation: currentSession.situation }));
    };

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
