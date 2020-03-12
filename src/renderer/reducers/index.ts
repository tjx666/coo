import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import friendsReducer from './friends';
import statusReducer from './status';

const rootReducer = combineReducers({
    user: userReducer,
    friends: friendsReducer,
    status: statusReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
