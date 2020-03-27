import { AxiosRequestConfig } from 'axios';

import { CommonResponse } from 'typings/coo';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    sendPrivateTextMessage: {
        method: 'POST',
        url: '/messages/private/text',
    },
    sendGroupTextMessage: {
        method: 'POST',
        url: '/messages/group/text',
    },
};
export default requestConfigs;

interface SendPrivateTextMessageResponseData {
    createdAt: number;
}

interface SendGroupTextMessageResponseData {
    createdAt: number;
}

export type SendPrivateTextMessageResponse = CommonResponse<SendPrivateTextMessageResponseData>;
export type SendGroupTextMessageResponse = CommonResponse<SendGroupTextMessageResponseData>;
