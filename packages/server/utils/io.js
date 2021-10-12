import dotenv from 'dotenv';
import { Server } from 'socket.io';

import httpServer from './server';

dotenv.config();

const webSocketConfig =
  process.env.NODE_ENV !== 'production'
    ? {
        cors: {
          origin: '*',
          methods: '*',
        },
      }
    : {};

const io = new Server(httpServer, webSocketConfig);

export default io;
