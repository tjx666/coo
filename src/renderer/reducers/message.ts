import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PrivateMessageItem {
    id: string;
    self: boolean;
    content: string;
    contentType: string;
    createdAt: number;
}

interface PrivateMessages {
    id: string;
    messages: PrivateMessageItem[];
}

export interface GroupMessageItem {
    // 群 id
    id: string;
    // 发送消息的人 id
    from: string;
    // 发送消息者名称
    name: string;
    avatar?: string;
    self: boolean;
    content: string;
    contentType: string;
    createdAt: number;
}

interface GroupMessages {
    // 群 id
    id: string;
    messages: GroupMessageItem[];
}

interface MessagesState {
    privateChat: Record<string, PrivateMessages>;
    groupChat: Record<string, GroupMessages>;
}

const initialState: MessagesState = {
    privateChat: {},
    groupChat: {},
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        resetMessages(messageState) {
            Object.assign(messageState, initialState);
        },
        addPrivateMessage(messageState, action: PayloadAction<PrivateMessageItem>) {
            const privateMessage = action.payload;
            const privateMessages = messageState.privateChat[privateMessage.id];
            if (privateMessages) {
                privateMessages.messages.push(privateMessage);
            } else {
                messageState.privateChat[privateMessage.id] = {
                    id: privateMessage.id,
                    messages: [privateMessage],
                };
            }
        },
        addGroupMessage(messageState, action: PayloadAction<GroupMessageItem>) {
            const groupMessage = action.payload;
            const groupMessages = messageState.groupChat[groupMessage.id];
            if (groupMessages) {
                groupMessages.messages.push(groupMessage);
            } else {
                messageState.groupChat[groupMessage.id] = {
                    id: groupMessage.id,
                    messages: [groupMessage],
                };
            }
        },
    },
});

export default messageSlice.reducer;
export const { resetMessages, addPrivateMessage, addGroupMessage } = messageSlice.actions;
