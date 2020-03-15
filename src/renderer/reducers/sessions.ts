import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Session {
    id: string;
    name: string;
    avatar?: string;
    digest?: string;
    timestamp?: number;
}

interface SessionsState {
    sessionList: Array<[string, Session]>;
    currentSession: Session | undefined;
}

const initialState: SessionsState = {
    sessionList: [],
    currentSession: undefined,
};

const sessionsSlice = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        addSession(sessions: SessionsState, action: PayloadAction<Session>) {
            const newSession = action.payload;
            const notExists = sessions.sessionList.find(item => item[0] === newSession.id) == null;
            if (notExists) {
                sessions.sessionList.unshift([newSession.id, newSession]);
                sessions.currentSession = newSession;
            }
        },
        setCurrentSession(sessions: SessionsState, action: PayloadAction<string>) {
            const id = action.payload;
            // eslint-disable-next-line prefer-destructuring
            sessions.currentSession = sessions.sessionList.find(item => item[0] === id)![1];
        },
    },
});
export default sessionsSlice.reducer;
export const { addSession, setCurrentSession } = sessionsSlice.actions;
