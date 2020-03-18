// API 服务器地址
const BASE_URL = 'http://localhost:3600';
const API_PREFIX = `${BASE_URL}/api/v1`;
// 资源服务器地址，暂时和 API 服务器一样，后期可能使用 nginx 托管静态资源那就不一样了
const ASSETS_BASE_URL = 'http://localhost:3600';

export { BASE_URL, API_PREFIX, ASSETS_BASE_URL };
export { default as DEFAULT_AVATAR } from 'assets/images/defaultAvatar.png';
