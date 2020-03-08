import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { omit } from 'lodash';

import { AppThunk } from '@/store';
import api, { AxiosResponse } from 'api';
import { GetUserResponse, UserModel } from 'api/user';
import storage from 'utils/storage';

interface UserState {
    id: string;
    email: string;
    name: string;
    avatar: string;
    fetchError: string | null;
}

type ModifiedUserInfo = Partial<UserState>;

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
        updateUser(state, action: PayloadAction<ModifiedUserInfo>) {
            Object.assign(state, action.payload);
        },
        getUserInfoSuccess(state, action: PayloadAction<Required<UserModel>>) {
            const newUserInfo = action.payload;
            Object.assign(state, {
                id: newUserInfo._id,
                ...omit(newUserInfo, ['_id']),
            });
        },
        getUserInfoFailed: fetchFailed,
    },
});

export const { updateUser, getUserInfoSuccess, getUserInfoFailed } = userSlice.actions;
export default userSlice.reducer;

export function fetchUserInfo(): AppThunk {
    return async dispatch => {
        let resp: AxiosResponse<GetUserResponse> | undefined;
        try {
            resp = await api<GetUserResponse>('getUser', {
                pathParams: { id: storage.get('id')! },
            });
        } catch (error) {
            message.error('获取用户信息出错！');
            dispatch(getUserInfoFailed(error.message || '请求用户信息出错'));
            return;
        }
        dispatch(getUserInfoSuccess(resp.data.data));
    };
}