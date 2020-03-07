import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    email: string;
    name: string;
    avatar: string;
}

const initialState: UserState = {
    id: '',
    email: '',
    name: '',
    avatar: '',
};

type ModifiedUserInfo = Partial<UserState>;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<ModifiedUserInfo>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
