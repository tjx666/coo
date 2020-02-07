import { AxiosRequestConfig } from 'axios';

const requestConfigs: Record<string, AxiosRequestConfig> = {
    register: {
        method: 'POST',
        url: '/users/register',
    },
    login: {
        method: 'POST',
        url: '/users/login',
    },
    getUser: {
        method: 'GET',
        url: '/users/:id',
    },
};

export default requestConfigs;
