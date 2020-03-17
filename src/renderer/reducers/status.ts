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
        setIsFirstEnterContactsPage(status, action: PayloadAction<boolean>) {
            status.isFirstEnterContactsPage = action.payload;
        },
        setActiveGroupInContactsPage(status, action: PayloadAction<string[]>) {
            status.activeGroupInContactsPage = action.payload;
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
