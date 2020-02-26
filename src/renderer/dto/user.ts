import { CommonResponse } from '../typings/coo';

interface UserModel {
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
