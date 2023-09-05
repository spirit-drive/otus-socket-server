import { RequestHandler } from 'express-serve-static-core';
import { getParamsFromToken } from '../utils/helpers';
import { UserDocument, UserModel } from '../models/User';

export const AUTHENTICATION_TYPE = 'Bearer';
const regexpForRemoveAuthenticationType = new RegExp(`^${AUTHENTICATION_TYPE}\\s`);
const getToken = (authentication: string): string => authentication?.replace(regexpForRemoveAuthenticationType, '');

export const authentication: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers as { authorization: string };
  const token = getToken(authorization);
  if (token == null) return res.sendStatus(401);

  try {
    const { id: userId } = await getParamsFromToken<{ id: string }>(token);
    req.user = (await UserModel.findById(userId)) as UserDocument;
    next();
  } catch (e) {
    res.sendStatus(403);
  }
};
