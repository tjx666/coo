import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import friendsReducer from './friends';

const rootReducer = combineReducers({
    user: userReducer,
    friends: friendsReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
