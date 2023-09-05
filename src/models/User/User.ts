import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { generateHash, isValidCode, isValidEmail, isValidNickname } from './helpers';
import { Profile } from '../../rest/profile/types';

export type UserMain = Profile & {
  password: string;
};

export type UserMethods = {
  generateHash: (password: string) => Promise<string>;
  isRightPassword: (password: string) => boolean;
};

export type UserNative = UserMain & UserMethods;

export type UserDocument = Document & UserNative;

export const UserSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    validate: {
      validator: isValidNickname,
      message: (props): string => `"${props.value}" is not valid nickname`,
    },
  },
  email: {
    unique: true,
    required: true,
    type: String,
    validate: {
      validator: isValidEmail,
      message: (props): string => `"${props.value}" is not valid email`,
    },
  },
  password: {
    required: true,
    type: String,
  },
  signUpDate: {
    required: true,
    type: Date,
    default: () => new Date(),
  },
});

const methods: UserMethods = {
  generateHash,
  isRightPassword(password: string) {
    return isValidCode(password, this.password);
  },
};

Object.assign(UserSchema.methods, methods);

export const UserModel = mongoose.model('User', UserSchema);
