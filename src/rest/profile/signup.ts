import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { AuthResult, SignBody } from './types';
import { UserDocument, UserModel } from '../../models/User';
import { AccountAlreadyExistError, DataBaseError } from '../../Errors';
import { getTokenByParams } from '../../utils/helpers';

export const signup: RequestHandler<ParamsDictionary, AuthResult, SignBody> = async (req, res, next) => {
  const { password, email } = req.body;

  let foundUsers;
  try {
    foundUsers = (await UserModel.findOne({ email })) as UserDocument;
  } catch (e) {
    return next(new DataBaseError(e));
  }
  if (foundUsers) {
    return next(new AccountAlreadyExistError(`User with email: ${foundUsers.email} already exist`));
  }
  const user = new UserModel() as UserDocument;
  user.email = email;
  user.password = await user.generateHash(password);

  try {
    await user.save();
  } catch (e) {
    return next(new DataBaseError(e));
  }

  const token = getTokenByParams({ id: user._id });
  res.send({ token });
};
