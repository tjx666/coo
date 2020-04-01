import { AxiosRequestConfig } from 'axios';

interface Theme {
    primaryColor: string;
}

interface CooDebug {
    j: (path: string) => void | undefined;
    resetMessages: () => void;
}

interface Coo {
    theme: Theme;
}

declare global {
    interface Window {
        COO_DEBUG: CooDebug;
        COO: Coo;
    }
}

export type RequestConfig = AxiosRequestConfig & {
    pathParams?: Record<string, string>;
    errorMessage?: boolean | string | Function;
};

export interface CommonResponse<T = Object> {
    code: number;
    msg: string;
    data: T;
}

export interface UserModel {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface MessageModel {
    from: string;
    to: string;
    content: string;
}

export interface GroupModel {
    id: string;
    name: string;
    master: string;
    count: number;
    avatar?: string;
}
