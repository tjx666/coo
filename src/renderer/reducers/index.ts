import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import friendsReducer from './friends';
import statusReducer from './status';
import sessionsReduce from './sessions';
import messagesReducer from './messages';

const rootReducer = combineReducers({
    user: userReducer,
    friends: friendsReducer,
    status: statusReducer,
    sessions: sessionsReduce,
    messages: messagesReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
