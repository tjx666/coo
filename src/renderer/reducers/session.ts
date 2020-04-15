import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum MessageSituation {
    PRIVATE = 'private',
    GROUP = 'group',
    SYSTEM = 'system',
}
export interface Session {
    id: string;
    name: string;
    avatar?: string;
    latestMessage: string;
    situation: MessageSituation;
    updatedAt: number;
}

interface SessionState {
    sessionList: Array<Session>;
    currentSession: Session | undefined;
}

interface SimpleSessionPayload {
    id: string;
    situation: MessageSituation;
}

const initialState: SessionState = {
    sessionList: [],
    currentSession: undefined,
};

/**
 * 每个 session 都有 id 和 situation，例如是私聊 session，id 就是对面用户的 id，群聊就是群 id
 *
 * 仅仅是 id 并不能确定唯一的 session，因为群 id 在极低的情况下是可能和用户 id 相同的
 * 所以需要 id 和 situation 都一样的时候才能保证是同一个 session
 */
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        resetSessions(sessionState) {
            Object.assign(sessionState, initialState);
        },
        stickySession(sessionState, action: PayloadAction<SimpleSessionPayload>) {
            const { id, situation } = action.payload;
            const index = sessionState.sessionList.findIndex(
                (session) => session.id === id && situation === session.situation,
            );
            const stickySession = sessionState.sessionList.splice(index, 1);
            sessionState.sessionList.unshift(stickySession[0]);
        },
        setCurrentSession(sessionState, action: PayloadAction<SimpleSessionPayload>) {
            const { id, situation } = action.payload;
            sessionState.currentSession = sessionState.sessionList.find(
                (item) => item.id === id && item.situation === situation,
            );
        },
        addSession(sessionState, action: PayloadAction<Session>) {
            const newSession = action.payload;
            const session = sessionState.sessionList.find(
                (item) => item.id === newSession.id && item.situation === newSession.situation,
            );
            if (session) {
                sessionState.currentSession = session;
            } else {
                sessionState.sessionList.unshift(newSession);
                sessionState.currentSession = newSession;
            }
        },
        removePrivateSession(sessionState, action: PayloadAction<string>) {
            const friendId = action.payload;
            const removedSessionIndex = sessionState.sessionList.findIndex(
                (session) =>
                    session.id === friendId && session.situation === MessageSituation.PRIVATE,
            );
            if (~removedSessionIndex) {
                sessionState.sessionList.splice(removedSessionIndex, 1);
            }

            const currentSession = sessionState.currentSession!;
            if (
                friendId === currentSession.id &&
                currentSession.situation === MessageSituation.PRIVATE
            ) {
                sessionState.currentSession = undefined;
            }
        },
        removeGroupSession(sessionState, action: PayloadAction<string>) {
            const groupId = action.payload;
            const removedSessionIndex = sessionState.sessionList.findIndex(
                (session) => session.id === groupId && session.situation === MessageSituation.GROUP,
            );
            if (~removedSessionIndex) {
                sessionState.sessionList.splice(removedSessionIndex, 1);
            }

            const currentSession = sessionState.currentSession!;
            if (
                groupId === currentSession.id &&
                currentSession.situation === MessageSituation.GROUP
            ) {
                sessionState.currentSession = undefined;
            }
        },
    },
});
export default sessionSlice.reducer;
export const {
    resetSessions,
    stickySession,
    setCurrentSession,
    addSession,
    removePrivateSession,
    removeGroupSession,
} = sessionSlice.actions;
