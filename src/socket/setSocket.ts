import * as http from 'http';
import { Server } from 'socket.io';
import { authentication } from './authentication';

export const setSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(socket.id);
  });

  io.use(authentication);
};
