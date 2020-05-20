import io from 'socket.io-client';

import { BASE_URL } from 'utils/constants';
import storage from 'utils/storage';

const socket = io(BASE_URL, {
    path: '/io',
    query: {
        // 从本地存储读取用户 id
        id: storage.get('id'),
        // 登入时保存在本地的 JWT token
        token: storage.get('token'),
    },
    // 指定底层协议为 WebSocket
    transports: ['websocket'],
});

export default socket;
