import { io } from 'socket.io-client';

const socket =
  process.env.NODE_ENV !== 'production'
    ? io(`http://192.168.1.18:${8000}`)
    : io();

export default socket;
