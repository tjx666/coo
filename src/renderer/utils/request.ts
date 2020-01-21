import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8888/api/v1/',
});

request.interceptors.request.use(config => {
    const { url } = config;
    const permittedUrls = ['/users/register', 'users/login'];
    console.log({ url });

    if (!url || !permittedUrls.includes(url)) {
        const AUTH_TOKEN = localStorage.getItem('jwt');

        if (!AUTH_TOKEN) {
            window.location.href = '/login';
            throw new Error(`Can't get local token!`);
        }

        config.headers.Authorization = AUTH_TOKEN;
    }

    return config;
});

export default request;
