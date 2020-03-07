import { AxiosRequestConfig } from 'axios';

import { CommonResponse } from '../typings/coo';

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
    updateProfile: {
        method: 'PUT',
        url: '/users/:id',
    },
};

export interface UserModel {
    _id?: string;
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
export type UpdateProfileResponse = CommonResponse;

export default requestConfigs;
