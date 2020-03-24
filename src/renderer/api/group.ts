import { AxiosRequestConfig } from 'axios';

import { CommonResponse } from 'typings/coo';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    createGroup: {
        method: 'POST',
        url: '/groups',
    },
};
export default requestConfigs;

export type CreateGroupResponse = CommonResponse<Object>;
