import { AxiosRequestConfig } from 'axios';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    registerUser: {
        method: 'POST',
        url: '/users/register',
    },
};

export default requestConfigs;
