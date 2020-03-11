import { AxiosRequestConfig } from 'axios';

export type RequestConfig = AxiosRequestConfig & {
    pathParams?: Record<string, string>;
    errorMessage?: boolean | string | Function;
};

export interface CommonResponse<T = Record<string, any>> {
    code: number;
    msg: string;
    data: T;
}
