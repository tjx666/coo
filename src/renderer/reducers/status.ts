import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import persistStorage from 'utils/persistStorage';

interface StatusState {
    isFirstEnterContactsPage: boolean;
    activeGroupInContactsPage: string[];
}

const initialState: StatusState = {
    isFirstEnterContactsPage: true,
    activeGroupInContactsPage: [],
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setIsFirstEnterContactsPage(state: StatusState, action: PayloadAction<boolean>) {
            state.isFirstEnterContactsPage = action.payload;
        },
        setActiveGroupInContactsPage(state: StatusState, action: PayloadAction<string[]>) {
            state.activeGroupInContactsPage = action.payload;
        },
    },
});

const statusPersistConfig = {
    key: 'status',
    storage: persistStorage,
    blacklist: ['isFirstEnterContactsPage'],
};
const statusReducer = persistReducer(statusPersistConfig, statusSlice.reducer);

export const { setIsFirstEnterContactsPage, setActiveGroupInContactsPage } = statusSlice.actions;
export default statusReducer;
