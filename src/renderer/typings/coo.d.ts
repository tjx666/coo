import { AxiosRequestConfig } from 'axios';

interface Theme {
    primaryColor: string;
}

declare global {
    interface Window {
        j: (path: string) => void | undefined;
        theme: Theme;
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
