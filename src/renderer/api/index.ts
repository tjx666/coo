import { AxiosPromise, AxiosResponse } from 'axios';
import { merge } from 'lodash';
import request from 'utils/request';

import { RequestConfig } from '../typings/coo';
import userRequestsConfigs from './user';

const requestConfigs: Record<string, RequestConfig> = {
    ...userRequestsConfigs,
};

function parserPathParams(url: string, params: Record<string, string> | undefined): string {
    const PATH_PARAMETER_RE = /:(\w+)/g;
    let match = PATH_PARAMETER_RE.exec(url);
    while (match) {
        const [sourceArg, argKey] = match;
        if (!params || !params[argKey]) {
            throw new TypeError(`Your request config lost path parameter ${argKey}!`);
        }
        url = url.replace(sourceArg, params[argKey]);
        match = PATH_PARAMETER_RE.exec(url);
    }
    return url;
}

export default async function api<T>(id: string, requestConfig?: RequestConfig) {
    const preDefinedConfig = requestConfigs[id];
    if (preDefinedConfig === undefined) throw new Error(`Can't find a api id match ${id}!`);

    const { url } = preDefinedConfig;
    if (url && requestConfig) {
        preDefinedConfig.url = parserPathParams(url, requestConfig.pathParams);
    }

    return request(merge(preDefinedConfig, requestConfig)) as AxiosPromise<T>;
}

export type Response<T> = AxiosResponse<T>;
