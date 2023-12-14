import { getParamsFromToken, getTokenByParams } from '../utils/helpers';
import { UserDocument, UserModel } from '../models/User';
import { getToken } from '../utils/authentication';
import { Socket } from 'socket.io/dist/socket';
import { ExtendedError } from 'socket.io/dist/namespace';
import { TokenRequiredError, UserNotFoundError } from '../Errors';

export const authentication = async (socket: Socket, next: (err?: ExtendedError) => void) => {
  const authorization = socket.handshake.query.token as string;
  const token = getToken(authorization);
  if (!token) return next(new TokenRequiredError('token is required'));

  try {
    const { id: userId } = await getParamsFromToken<{ id: string }>(token);
    Object.assign(socket, { user: (await UserModel.findById(userId)) as UserDocument });
    next();
  } catch (e) {
    next(new UserNotFoundError(`user not found`));
  }
};
