import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { AppThunk } from '@/store';
import api, { Response } from 'api';
import { GetUserResponse, UserModel } from 'api/user';
import storage from 'utils/storage';

interface UserState {
    id: string;
    email: string;
    name: string;
    avatar: string;
    fetchError: string | null;
}

const initialState: UserState = {
    id: '',
    email: '',
    name: '',
    avatar: '',
    fetchError: null,
};

function fetchFailed(state: UserState, action: PayloadAction<string>) {
    state.fetchError = action.payload;
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserInfo(userInfo) {
            Object.assign(userInfo, initialState);
        },
        updateUser(userInfo, action: PayloadAction<Partial<UserState>>) {
            Object.assign(userInfo, action.payload);
        },
        getUserInfoSuccess(userInfo, action: PayloadAction<UserModel>) {
            const newUserInfo = action.payload;
            Object.assign(userInfo, newUserInfo);
            userInfo.fetchError = null;
        },
        getUserInfoFailed: fetchFailed,
    },
});

export const { updateUser, getUserInfoSuccess, getUserInfoFailed } = userSlice.actions;
export default userSlice.reducer;

export function fetchUserInfo(): AppThunk {
    return async dispatch => {
        let resp: Response<GetUserResponse> | undefined;
        try {
            resp = await api<GetUserResponse>('getUser', {
                pathParams: { id: storage.get('id')! },
            });
        } catch (error) {
            console.error(error);
            message.error('获取用户信息出错！');
            dispatch(getUserInfoFailed(error.message || '请求用户信息出错'));
            return;
        }
        dispatch(getUserInfoSuccess(resp.data.data));
    };
}
