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

interface PrivateMessagePayload {
    id: string;
    content: string;
    timestamp: number;
    self: boolean;
}

const initialState: MessagesState = {
    privateChatMessages: {},
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        resetPrivateMessages(messages) {
            messages.privateChatMessages = {};
        },
        addPrivateMessage(messages, action: PayloadAction<PrivateMessagePayload>) {
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
    },
});

export default messagesSlice.reducer;
export const { addPrivateMessage } = messagesSlice.actions;
