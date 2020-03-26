import { AxiosRequestConfig } from 'axios';

import { CommonResponse, GroupModel, UserModel } from 'typings/coo';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    register: {
        method: 'POST',
        url: '/users/register',
    },
    login: {
        method: 'POST',
        url: '/users/login',
    },
    getUser: {
        method: 'GET',
        url: '/users/:id',
    },
    getFriends: {
        method: 'GET',
        url: '/users/:id/friends',
    },
    getGroups: {
        method: 'GET',
        url: '/users/:id/groups',
    },
    updateProfile: {
        method: 'PUT',
        url: '/users/:id',
    },
    searchUser: {
        method: 'POST',
        url: '/search/user',
    },
    applyForFriend: {
        method: 'POST',
        url: '/users/:id/friends',
    },
    removeFriend: {
        method: 'DELETE',
        url: '/users/:id/friends',
    },
};
export default requestConfigs;

interface LoginResponseData {
    user: Required<UserModel>;
    token: string;
}

export interface SearchUserResponseData {
    existed: boolean;
    user: UserModel | Object;
}

export type RegisterResponse = CommonResponse;
export type LoginResponse = CommonResponse<LoginResponseData>;
export type GetUserResponse = CommonResponse<UserModel>;
export type GetFriendsResponse = CommonResponse<Array<UserModel>>;
export type GetGroupsResponse = CommonResponse<GroupModel[]>;
export type UpdateProfileResponse = CommonResponse;
export type SearchUserResponse = CommonResponse<SearchUserResponseData>;
export type ApplyForFriendResponse = CommonResponse;
export type RemoveFriendResponse = CommonResponse;
