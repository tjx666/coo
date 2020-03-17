import { AxiosRequestConfig } from 'axios';

import { CommonResponse } from 'typings/coo';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    sendPrivateTextMessage: {
        method: 'POST',
        url: '/messages/private/text',
    },
};
export default requestConfigs;

export interface MessageModel {
    from: string;
    to: string;
    content: string;
}

export type SendPrivateTextMessageResponse = CommonResponse<Object>;
