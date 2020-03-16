/* eslint-disable prefer-destructuring */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Session {
    id: string;
    name: string;
    avatar?: string;
    digest?: string;
    timestamp?: number;
}

interface SessionsState {
    sessionList: Array<Session>;
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
            const session = sessions.sessionList.find(item => item.id === newSession.id);
            if (session) {
                sessions.currentSession = session;
            } else {
                sessions.sessionList.unshift(newSession);
                sessions.currentSession = newSession;
            }
        },
        setCurrentSession(sessions: SessionsState, action: PayloadAction<string>) {
            const id = action.payload;
            sessions.currentSession = sessions.sessionList.find(item => item.id === id);
        },
        stickySession(sessions: SessionsState, action: PayloadAction<string>) {
            const id = action.payload;
            const index = sessions.sessionList.findIndex(session => session.id === id);
            const stickySession = sessions.sessionList.splice(index, 1);
            sessions.sessionList.unshift(stickySession[0]);
        },
    },
});
export default sessionsSlice.reducer;
export const { addSession, setCurrentSession, stickySession } = sessionsSlice.actions;
