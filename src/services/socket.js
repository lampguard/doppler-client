import io from 'socket.io-client';

const socket = io(__ENV__.WS_URL);

socket.on('connect', () => {
	console.log('Connected');
});

export default () => socket;
