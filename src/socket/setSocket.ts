import * as http from 'http';
import { Server } from 'socket.io';
import { authentication } from './authentication';
import { User } from '../server.types';
import { prepareUser } from '../models/helpers/prepareUser';
import { UserDocument } from '../models/User';

let activeUsers: User[] = [];
let io: Server;

export const setSocket = (httpServer: http.Server) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const user = prepareUser((socket as unknown as { user: UserDocument }).user);
    activeUsers.push(user);

    io.emit('users', activeUsers);

    socket.on('disconnect', () => {
      activeUsers = activeUsers.filter((u) => u.id !== user.id);

      io.emit('users', activeUsers);
    });
  });

  io.use(authentication);
};

export const saveUserHook = (doc: UserDocument) => {
  const user = prepareUser(doc);
  activeUsers = activeUsers.map((u) => (u.id === user.id ? user : u));
  io.emit('users', activeUsers);
};
