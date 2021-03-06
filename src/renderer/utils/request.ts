import axios from 'axios';
import { message } from 'antd';

import { API_PREFIX } from './constants';
import storage from './storage';

const request = axios.create({
    baseURL: API_PREFIX,
});

request.interceptors.request.use((config) => {
    const { url } = config;
    const permittedUrls = new Set(['/users/register', '/users/login']);

    if (!url || !permittedUrls.has(url)) {
        const AUTH_TOKEN = storage.get('token');

        if (!AUTH_TOKEN) {
            window.location.href = '/login';
            throw new Error(`Can't get local token!`);
        }

        config.headers.Authorization = AUTH_TOKEN;
    }

    return config;
});

request.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response == null) {
            return Promise.reject(error);
        }

        const { errorMessage } = error.response.config;
        if (typeof errorMessage === 'string') {
            message.error(errorMessage);
        } else if (typeof errorMessage === 'function') {
            message.error(errorMessage(error));
        } else if (errorMessage === true) {
            message.error(error.response.data.msg);
        }

        if (error.response.config.url !== '/users/login' && error.response.status === 401) {
            message.error('您需要先登入！', 3, () => {
                window.location.href = '/login';
            });
        }

        return Promise.reject(error);
    },
);

export default request;
