import io from 'socket.io-client';

const url = import.meta.env.VITE_APP_SOCKET_URL;

const socket = io(url, {
    transports: ['polling'],
});

export default socket;