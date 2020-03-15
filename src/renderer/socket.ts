import io from 'socket.io-client';

import { BASE_URL } from 'utils/constants';
import storage from 'utils/storage';

const socket = io(BASE_URL, {
    path: '/io',
    query: {
        id: storage.get('id'),
        token: storage.get('token'),
    },
    transports: ['websocket'],
});

export default socket;
