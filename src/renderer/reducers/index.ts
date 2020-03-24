import { combineReducers } from '@reduxjs/toolkit';

import profileReducer from './profile';
import friendReducer from './friend';
import groupReducer from './group';
import statusReducer from './status';
import sessionReduce from './session';
import messageReducer from './message';

const rootReducer = combineReducers({
    profile: profileReducer,
    friend: friendReducer,
    status: statusReducer,
    session: sessionReduce,
    message: messageReducer,
    group: groupReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
