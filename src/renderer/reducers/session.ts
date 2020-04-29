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

interface SessionIdentity {
    id: string;
    situation: MessageSituation;
}

const initialState: SessionState = {
    sessionList: [],
    currentSession: undefined,
};

export function findSessionIndex(sessionList: Array<Session>, { id, situation }: SessionIdentity) {
    return sessionList.findIndex((session) => session.id === id && situation === session.situation);
}

export function findSession(sessionList: Array<Session>, sessionIdentity: SessionIdentity) {
    return sessionList[findSessionIndex(sessionList, sessionIdentity)];
}

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
        stickySession(sessionState, action: PayloadAction<SessionIdentity>) {
            const index = findSessionIndex(sessionState.sessionList, action.payload);
            const stickySession = sessionState.sessionList.splice(index, 1);
            sessionState.sessionList.unshift(stickySession[0]);
        },
        setCurrentSession(sessionState, action: PayloadAction<SessionIdentity>) {
            sessionState.currentSession = findSession(sessionState.sessionList, action.payload);
        },
        addSession(sessionState, action: PayloadAction<Session>) {
            const newSession = action.payload;
            const session = findSession(sessionState.sessionList, newSession);
            if (session) {
                sessionState.currentSession = session;
            } else {
                sessionState.sessionList.unshift(newSession);
                sessionState.currentSession = newSession;
            }
        },
        removePrivateSession(sessionState, action: PayloadAction<string>) {
            const friendId = action.payload;
            const removedSessionIndex = findSessionIndex(sessionState.sessionList, {
                id: friendId,
                situation: MessageSituation.PRIVATE,
            });
            if (~removedSessionIndex) {
                sessionState.sessionList.splice(removedSessionIndex, 1);
            }

            const { currentSession } = sessionState;
            if (
                friendId === currentSession?.id &&
                currentSession.situation === MessageSituation.PRIVATE
            ) {
                sessionState.currentSession = undefined;
            }
        },
        removeGroupSession(sessionState, action: PayloadAction<string>) {
            const groupId = action.payload;
            const removedSessionIndex = findSessionIndex(sessionState.sessionList, {
                id: groupId,
                situation: MessageSituation.PRIVATE,
            });
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
