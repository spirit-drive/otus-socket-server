import * as http from 'http';
import { Server } from 'socket.io';

export const setSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(socket.id);
  });
};
