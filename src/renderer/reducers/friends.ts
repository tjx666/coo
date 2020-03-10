import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { AppThunk } from '@/store';
import api, { AxiosResponse } from 'api';
import { UserModel, GetFriendsResponse } from 'api/user';
import storage from '@/utils/storage';

interface FriendsState {
    friendList: Array<UserModel>;
    fetchError: string | null;
    isLoading: boolean;
}

const initialState: FriendsState = {
    friendList: [],
    fetchError: null,
    isLoading: false,
};

function startLoading(state: FriendsState) {
    state.isLoading = true;
}

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        getFriendsStart: startLoading,
        getFriendsSuccess(state: FriendsState, action: PayloadAction<Array<UserModel>>) {
            state.friendList = action.payload;
            state.isLoading = false;
        },
        getFriendsFailed(state: FriendsState, action: PayloadAction<string>) {
            state.fetchError = action.payload;
            state.isLoading = false;
        },
    },
});

export const { getFriendsStart, getFriendsSuccess, getFriendsFailed } = friendsSlice.actions;
export default friendsSlice.reducer;

export function fetchFriends(): AppThunk {
    return async dispatch => {
        dispatch(getFriendsStart());
        let resp: AxiosResponse<GetFriendsResponse> | undefined;
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
