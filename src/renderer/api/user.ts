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
};
export default requestConfigs;

export interface UserModel {
    id: string;
    email?: string;
    name?: string;
    avatar?: string;
}

interface RegisterResponseData {
    user: Required<UserModel>;
    token: string;
}

export type RegisterResponse = CommonResponse<RegisterResponseData>;
export type LoginResponse = CommonResponse<RegisterResponseData>;
export type GetUserResponse = CommonResponse<Required<UserModel>>;
export type GetFriendsResponse = CommonResponse<Array<UserModel>>;
export type UpdateProfileResponse = CommonResponse;
