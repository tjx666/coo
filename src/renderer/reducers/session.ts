import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Session {
    id: string;
    name: string;
    avatar?: string;
    digest?: string;
    timestamp?: number;
}

interface SessionState {
    sessionList: Array<Session>;
    currentSession: Session | undefined;
}

const initialState: SessionState = {
    sessionList: [],
    currentSession: undefined,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        resetSessions(sessionState) {
            Object.assign(sessionState, initialState);
        },
        stickySession(sessionState, action: PayloadAction<string>) {
            const id = action.payload;
            const index = sessionState.sessionList.findIndex(session => session.id === id);
            const stickySession = sessionState.sessionList.splice(index, 1);
            sessionState.sessionList.unshift(stickySession[0]);
        },
        setCurrentSession(sessionState, action: PayloadAction<string>) {
            const id = action.payload;
            sessionState.currentSession = sessionState.sessionList.find(item => item.id === id);
        },
        addSession(sessionState, action: PayloadAction<Session>) {
            const newSession = action.payload;
            const session = sessionState.sessionList.find(item => item.id === newSession.id);
            if (session) {
                sessionState.currentSession = session;
            } else {
                sessionState.sessionList.unshift(newSession);
                sessionState.currentSession = newSession;
            }
        },
    },
});
export default sessionSlice.reducer;
export const { resetSessions, stickySession, setCurrentSession, addSession } = sessionSlice.actions;
