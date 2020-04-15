import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { AppThunk } from '@/store';
import api, { Response } from 'api';
import { GetGroupsResponse } from 'api/user';
import storage from 'utils/storage';
import { GroupModel } from 'typings/coo';

interface GroupState {
    groupList: GroupModel[];
    fetchError: string | null;
    isLoading: boolean;
}

const initialState: GroupState = {
    groupList: [],
    fetchError: null,
    isLoading: false,
};

function startLoading(state: GroupState) {
    state.isLoading = true;
}

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        getGroupsStart: startLoading,
        getGroupsSuccess(groupState, action: PayloadAction<Array<GroupModel>>) {
            groupState.groupList = action.payload;
            groupState.isLoading = false;
        },
        getGroupsFailed(groupState, action: PayloadAction<string>) {
            groupState.fetchError = action.payload;
            groupState.isLoading = false;
        },
    },
});

export const { getGroupsStart, getGroupsSuccess, getGroupsFailed } = groupSlice.actions;
export default groupSlice.reducer;

export function fetchGroups(): AppThunk {
    return async (dispatch) => {
        dispatch(getGroupsStart());
        let resp: Response<GetGroupsResponse> | undefined;
        try {
            resp = await api<GetGroupsResponse>('getGroups', {
                pathParams: { id: storage.get('id') },
            });
        } catch (error) {
            console.error(error);
            message.error('拉取群列表失败！');
            dispatch(getGroupsFailed(error.message ?? '请求群数据出错'));
            return;
        }
        dispatch(getGroupsSuccess(resp.data.data));
    };
}
