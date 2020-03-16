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
    privateChatMessages: Record<string, PrivateMessages>;
}

const initialState: MessagesState = {
    privateChatMessages: {},
};

interface PrivateMessagePayload {
    id: string;
    content: string;
    timestamp: number;
    self: boolean;
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addPrivateMessage(messages: MessagesState, action: PayloadAction<PrivateMessagePayload>) {
            const privateMessage = action.payload;
            const newMessageItem = omit(privateMessage, ['id']);
            const privateMessages = messages.privateChatMessages[privateMessage.id];
            if (privateMessages) {
                privateMessages.messages.push(newMessageItem);
            } else {
                messages.privateChatMessages[privateMessage.id] = {
                    id: privateMessage.id,
                    messages: [newMessageItem],
                };
            }
        },
        resetPrivateMessages(messages: MessagesState) {
            messages.privateChatMessages = {};
        },
    },
});

export default messagesSlice.reducer;
export const { addPrivateMessage } = messagesSlice.actions;
