import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { AuthResult, SignBody } from './types';
import { UserDocument, UserModel } from '../../models/User';
import { DataBaseError, IncorrectPasswordOrEmailError } from '../../Errors';
import { getTokenByParams } from '../../utils/helpers';

export const signin: RequestHandler<ParamsDictionary, AuthResult, SignBody> = async (req, res, next) => {
  const { password, email } = req.body;
  let user: UserDocument;
  try {
    user = (await UserModel.findOne({ email })) as UserDocument;
  } catch (e) {
    return next(new DataBaseError(e));
  }
  if (!user || !user.isRightPassword(password)) {
    return next(new IncorrectPasswordOrEmailError('User not found or invalid password'));
  }

  const token = getTokenByParams({ id: user._id });
  res.send({ token });
};
