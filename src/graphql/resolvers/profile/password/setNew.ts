import { ResolverWithoutParent } from '../../../../../types';
import { UserDocument, UserModel } from '../../../../models/User';
import { DataBaseError, InvalidPasswordError, InvalidResetPasswordError, UserNotFoundError } from '../../../../Errors';
import * as bcrypt from 'bcrypt';
import { ResetPassword } from '../../../../graphql.types';
import { isValidPassword } from '../../../../models/User/helpers';

export const setNew: ResolverWithoutParent<
  { email: string; password: string; token: string },
  ResetPassword | Error
> = async (_, { email, password, token }) => {
  let user;
  try {
    user = (await UserModel.findOne({ email })) as UserDocument;
  } catch (e) {
    return new DataBaseError(e);
  }

  if (!user) {
    return new UserNotFoundError(`User by email: ${email} not found`);
  }

  if (Date.now() > user.resetPassword.deadline) {
    return new InvalidResetPasswordError(`token is expired`);
  }

  const valid = await bcrypt.compare(token, user.resetPassword.code);
  if (!valid) {
    return new InvalidResetPasswordError(`invalid token`);
  }

  if (!isValidPassword(password)) {
    return new InvalidPasswordError(`"${password}" is not valid password`);
  }

  user.password = await user.generateHash(password);
  user.resetPassword = {
    deadline: null,
    code: null,
  };

  try {
    await user.save();
  } catch (e) {
    return new DataBaseError(e);
  }

  return {
    success: true,
  };
};
