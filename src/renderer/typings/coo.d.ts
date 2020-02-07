import { AxiosRequestConfig } from 'axios';

export type RequestConfig = AxiosRequestConfig & {
    pathParams?: Record<string, string>;
};

export interface CommonResponse<T> {
    code: number;
    msg: string;
    data: T;
}
