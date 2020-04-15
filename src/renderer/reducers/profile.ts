import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { AppThunk } from '@/store';
import api, { Response } from 'api';
import { GetUserResponse } from 'api/user';
import storage from 'utils/storage';
import { UserModel } from 'typings/coo';

interface ProfileState {
    id: string;
    email: string;
    name: string;
    avatar: string;
    fetchError: string | null;
}

const initialState: ProfileState = {
    id: '',
    email: '',
    name: '',
    avatar: '',
    fetchError: null,
};

function fetchFailed(state: ProfileState, action: PayloadAction<string>) {
    state.fetchError = action.payload;
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile(profile) {
            Object.assign(profile, initialState);
        },
        updateProfile(profile, action: PayloadAction<Partial<ProfileState>>) {
            Object.assign(profile, action.payload);
        },
        getProfileSuccess(profile, action: PayloadAction<UserModel>) {
            const newProfile = action.payload;
            Object.assign(profile, newProfile);
            profile.fetchError = null;
        },
        getProfileFailed: fetchFailed,
    },
});

export const {
    resetProfile,
    updateProfile,
    getProfileSuccess,
    getProfileFailed,
} = profileSlice.actions;
export default profileSlice.reducer;

export function fetchProfile(): AppThunk {
    return async (dispatch) => {
        let resp: Response<GetUserResponse> | undefined;
        try {
            resp = await api<GetUserResponse>('getUser', {
                pathParams: { id: storage.get('id')! },
            });
        } catch (error) {
            console.error(error);
            message.error('获取用户信息出错！');
            dispatch(getProfileFailed(error.message ?? '请求用户信息出错'));
            return;
        }
        dispatch(getProfileSuccess(resp.data.data));
    };
}
