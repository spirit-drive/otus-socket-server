import { getParamsFromToken } from '../utils/helpers';
import { UserDocument, UserModel } from '../models/User';
import { getToken } from '../utils/authentication';
import { Socket } from 'socket.io/dist/socket';
import { ExtendedError } from 'socket.io/dist/namespace';

export const authentication = async (socket: Socket, next: (err?: ExtendedError) => void) => {
  const authorization = socket.handshake.auth.token;
  const token = getToken(authorization);
  if (token == null) return next(new Error('not authorized'));

  try {
    const { id: userId } = await getParamsFromToken<{ id: string }>(token);
    Object.assign(socket, { user: (await UserModel.findById(userId)) as UserDocument });
    next();
  } catch (e) {
    next(e);
  }
};
