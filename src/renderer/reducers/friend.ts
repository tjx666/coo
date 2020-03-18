import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { AppThunk } from '@/store';
import api, { Response } from 'api';
import { UserModel, GetFriendsResponse } from 'api/user';
import storage from 'utils/storage';

interface FriendState {
    friendList: Array<UserModel>;
    fetchError: string | null;
    isLoading: boolean;
}

const initialState: FriendState = {
    friendList: [],
    fetchError: null,
    isLoading: false,
};

function startLoading(state: FriendState) {
    state.isLoading = true;
}

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        getFriendsStart: startLoading,
        getFriendsSuccess(friendState, action: PayloadAction<Array<UserModel>>) {
            friendState.friendList = action.payload;
            friendState.isLoading = false;
        },
        getFriendsFailed(friendState, action: PayloadAction<string>) {
            friendState.fetchError = action.payload;
            friendState.isLoading = false;
        },
    },
});

export const { getFriendsStart, getFriendsSuccess, getFriendsFailed } = friendSlice.actions;
export default friendSlice.reducer;

export function fetchFriends(): AppThunk {
    return async dispatch => {
        dispatch(getFriendsStart());
        let resp: Response<GetFriendsResponse> | undefined;
        try {
            resp = await api<GetFriendsResponse>('getFriends', {
                pathParams: { id: storage.get('id') },
            });
        } catch (error) {
            console.error(error);
            message.error('拉取好友列表失败！');
            dispatch(getFriendsFailed(error.message || '请求好友数据出错'));
            return;
        }
        dispatch(getFriendsSuccess(resp.data.data));
    };
}
