import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import persistStorage from 'utils/persistStorage';

interface StatusState {
    isFirstEnterContactsPage: boolean;
    activeGroupsInContactsPage: string[];
    latestPathNameInContactsPage: string;
}

const initialState: StatusState = {
    isFirstEnterContactsPage: true,
    activeGroupsInContactsPage: [],
    latestPathNameInContactsPage: '/contacts',
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setIsFirstEnterContactsPage(status, action: PayloadAction<boolean>) {
            status.isFirstEnterContactsPage = action.payload;
        },
        setActiveGroupsInContactsPage(status, action: PayloadAction<string[]>) {
            status.activeGroupsInContactsPage = action.payload;
        },
        setLatestPathNameInContactsPage(status, action: PayloadAction<string>) {
            status.latestPathNameInContactsPage = action.payload;
        },
    },
});

const statusPersistConfig = {
    key: 'status',
    storage: persistStorage,
    blacklist: ['isFirstEnterContactsPage'],
};
const statusReducer = persistReducer(statusPersistConfig, statusSlice.reducer);

export const {
    setIsFirstEnterContactsPage,
    setActiveGroupsInContactsPage,
    setLatestPathNameInContactsPage,
} = statusSlice.actions;
export default statusReducer;
