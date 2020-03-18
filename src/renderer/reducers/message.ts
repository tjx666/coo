import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

export interface PrivateMessageItem {
    self: boolean;
    content: string;
    timestamp: number;
}

interface PrivateMessages {
    id: string;
    messages: PrivateMessageItem[];
}

interface MessagesState {
    privateChat: Record<string, PrivateMessages>;
}

interface PrivateMessagePayload {
    id: string;
    content: string;
    timestamp: number;
    self: boolean;
}

const initialState: MessagesState = {
    privateChat: {},
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        resetPrivateMessages(messageState) {
            messageState.privateChat = {};
        },
        addPrivateMessage(messageState, action: PayloadAction<PrivateMessagePayload>) {
            const privateMessage = action.payload;
            const newMessageItem = omit(privateMessage, ['id']);
            const privateMessages = messageState.privateChat[privateMessage.id];
            if (privateMessages) {
                privateMessages.messages.push(newMessageItem);
            } else {
                messageState.privateChat[privateMessage.id] = {
                    id: privateMessage.id,
                    messages: [newMessageItem],
                };
            }
        },
    },
});

export default messageSlice.reducer;
export const { resetPrivateMessages, addPrivateMessage } = messageSlice.actions;
