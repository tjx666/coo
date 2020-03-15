import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import friendsReducer from './friends';
import statusReducer from './status';
import sessionsReduces from './sessions';

const rootReducer = combineReducers({
    user: userReducer,
    friends: friendsReducer,
    status: statusReducer,
    sessions: sessionsReduces,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
