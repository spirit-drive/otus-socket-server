import { RequestHandler } from 'express-serve-static-core';
import { getParamsFromToken } from '../utils/helpers';
import { UserDocument, UserModel } from '../models/User';
import { getToken } from '../utils/authentication';
import { TokenRequiredError, UserNotFoundError } from '../Errors';

export const authentication: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers as { authorization: string };
  const token = getToken(authorization);
  if (!token) return res.status(401).send(new TokenRequiredError(`token is required`));

  try {
    const { id: userId } = await getParamsFromToken<{ id: string }>(token);
    req.user = (await UserModel.findById(userId)) as UserDocument;
    next();
  } catch (e) {
    res.status(403).send(new UserNotFoundError(`user not found`));
  }
};
