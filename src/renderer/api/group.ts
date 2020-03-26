import { AxiosRequestConfig } from 'axios';

import { CommonResponse, GroupModel } from 'typings/coo';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    createGroup: {
        method: 'POST',
        url: '/groups',
    },
    searchGroup: {
        method: 'POST',
        url: '/search/group',
    },
    applyForGroup: {
        method: 'POST',
        url: '/groups/apply',
    },
    exitGroup: {
        method: 'POST',
        url: '/groups/exit',
    },
    disbandGroup: {
        method: 'POST',
        url: '/groups/disband',
    },
};
export default requestConfigs;

export interface SearchGroupResponseData {
    existed: boolean;
    group: GroupModel | Object;
}

export type CreateGroupResponse = CommonResponse<Object>;
export type SearchGroupResponse = CommonResponse<SearchGroupResponseData>;
export type ApplyForGroupResponse = CommonResponse<Object>;
export type ExitGroupResponse = CommonResponse<Object>;
export type DisbandGroupResponse = CommonResponse<Object>;
