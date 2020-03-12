import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const { setIsFirstEnterContactsPage, setActiveGroupInContactsPage } = statusSlice.actions;
export default statusSlice.reducer;
