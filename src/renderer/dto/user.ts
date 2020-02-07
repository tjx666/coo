import { CommonResponse } from '../typings/coo';

interface UserModel {
    _id?: string;
    email?: string;
    name?: string;
}

export type RegisterResponse = CommonResponse<string>;

interface LoginResponseData {
    user: Required<UserModel>;
    token: string;
}
export type LoginResponse = CommonResponse<LoginResponseData>;

export type GetUserResponse = Required<UserModel>;
