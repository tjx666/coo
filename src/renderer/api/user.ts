/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios';

import { CommonResponse } from 'typings/coo';

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
    updateProfile: {
        method: 'PUT',
        url: '/users/:id',
    },
    searchUser: {
        method: 'GET',
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

export interface UserModel {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

interface RegisterResponseData {
    user: Required<UserModel>;
    token: string;
}

export type RegisterResponse = CommonResponse<RegisterResponseData>;
export type LoginResponse = CommonResponse<RegisterResponseData>;
export type GetUserResponse = CommonResponse<UserModel>;
export type GetFriendsResponse = CommonResponse<Array<UserModel>>;
export type UpdateProfileResponse = CommonResponse;
export type SearchUserResponse = CommonResponse<UserModel>;
export type ApplyForFriendResponse = CommonResponse<Object>;
export type RemoveFriendResponse = CommonResponse<Object>;
