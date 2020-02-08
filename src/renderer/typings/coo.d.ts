import { AxiosRequestConfig } from 'axios';

export type RequestConfig = AxiosRequestConfig & {
    pathParams?: Record<string, string>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export interface CommonResponse<T = Object> {
    code: number;
    msg: string;
    data: T;
}
