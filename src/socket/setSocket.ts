import * as http from 'http';
import { Server } from 'socket.io';
import { authentication } from './authentication';
import { GetMessagesArgs, SendMessageData, User } from '../server.types';
import { prepareMessages, prepareUser } from '../models/helpers/prepareUser';
import { UserDocument } from '../models/User';
import { MessageModel } from '../models/Message';
import { getChatId } from '../models/Message/helpers';

type UserSocket = User & {
  socketId: string;
};

export const prepareUsersForClient = (items: UserSocket[]): User[] => {
  if (!items?.length) return [] as User[];

  return items.map(({ socketId, ...i }) => ({ ...i }));
};

let activeUsers: UserSocket[] = [];
let io: Server;

const emitUsers = () => io.emit('users', prepareUsersForClient(activeUsers));

export const setSocket = (httpServer: http.Server) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const user = prepareUser((socket as unknown as { user: UserDocument }).user);
    activeUsers.push({ ...user, socketId: socket.id });

    emitUsers();

    socket.on('disconnect', () => {
      activeUsers = activeUsers.filter((u) => u.id !== user.id);

      emitUsers();
    });

    socket.on('getMessages', async (args: GetMessagesArgs) => {
      socket.rooms?.forEach((r) => socket.leave(r));
      const chatId = getChatId(args.userIds);

      socket.join(chatId);

      const messages = await MessageModel.find({ chatId });

      socket.emit('messages', await prepareMessages(messages));
    });

    socket.on('sendMessage', async (args: SendMessageData) => {
      const { content, recipientIds, authorId } = args;

      const ids = [authorId, ...recipientIds];

      const chatId = getChatId(ids);
      socket.join(chatId);

      const msg = new MessageModel({ content, chatId, authorId });
      await msg.save();

      const messages = await MessageModel.find({ chatId });

      const result = await prepareMessages(messages);
      io.to(chatId).emit('messages', result);
    });
  });

  io.use(authentication);
};

export const saveUserHook = (doc: UserDocument) => {
  const user = prepareUser(doc);
  const activeUser = activeUsers.find((i) => i.id === user.id);
  if (!activeUser) return;
  activeUsers = activeUsers.map((u) => (u.id === user.id ? { ...user, socketId: activeUser.socketId } : u));
  emitUsers();
};
