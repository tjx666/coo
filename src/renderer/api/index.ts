import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { merge } from 'lodash';

import request from '../utils/request';
import userRequestsConfigs from './user';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    ...userRequestsConfigs,
};

export * from 'axios';
export default async function api<T>(id: string, requestConfig?: AxiosRequestConfig) {
    const preDefinedConfig = requestConfigs[id];

    if (preDefinedConfig === undefined) throw new Error(`Can't find a api id match ${id}!`);

    return request(merge(preDefinedConfig, requestConfig)) as AxiosPromise<T>;
}
