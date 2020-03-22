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

interface MessagesState {
    privateChat: Record<string, PrivateMessages>;
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
    },
});

export default messageSlice.reducer;
export const { resetPrivateMessages, addPrivateMessage } = messageSlice.actions;
