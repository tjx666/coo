import { combineReducers } from '@reduxjs/toolkit';

import profileReducer from './profile';
import friendsReducer from './friend';
import statusReducer from './status';
import sessionsReduce from './session';
import messagesReducer from './message';

const rootReducer = combineReducers({
    profile: profileReducer,
    friend: friendsReducer,
    status: statusReducer,
    session: sessionsReduce,
    message: messagesReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
