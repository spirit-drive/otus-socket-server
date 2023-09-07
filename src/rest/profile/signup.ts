import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { AuthResult, SignBody } from './types';
import { UserDocument, UserModel } from '../../models/User';
import { AccountAlreadyExistError, DataBaseError } from '../../Errors';
import { getTokenByParams } from '../../utils/helpers';

export const signup: RequestHandler<ParamsDictionary, AuthResult | Error, SignBody> = async (req, res) => {
  const { password, email } = req.body;

  let foundUsers;
  try {
    foundUsers = (await UserModel.findOne({ email })) as UserDocument;
  } catch (e) {
    return res.status(400).send(new DataBaseError(e));
  }
  if (foundUsers) {
    return res.status(400).send(new AccountAlreadyExistError(`User with email: ${foundUsers.email} already exist`));
  }
  const user = new UserModel() as UserDocument;
  user.email = email;
  user.password = await user.generateHash(password);

  try {
    await user.save();
  } catch (e) {
    return res.status(400).send(new DataBaseError(e));
  }

  const token = getTokenByParams({ id: user._id });
  res.send({ token });
};
