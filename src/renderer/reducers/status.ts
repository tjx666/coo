import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import persistStorage from 'utils/persistStorage';

interface StatusState {
    isFirstEnterContactsPage: boolean;
    activeGroupsInContactsPage: string[];
    // 因为 react router 没有类似 vue router 中 keep-alive 也就是路由缓存功能
    // 所以使用一个状态保存当前最新的子页面
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
