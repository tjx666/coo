import { AxiosRequestConfig } from 'axios';

import { CommonResponse } from 'typings/coo';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    sendPrivateTextMessage: {
        method: 'POST',
        url: '/messages/private/text',
    },
};
export default requestConfigs;

interface SendPrivateTextMessageResponseData {
    createdAt: number;
}

export type SendPrivateTextMessageResponse = CommonResponse<SendPrivateTextMessageResponseData>;
