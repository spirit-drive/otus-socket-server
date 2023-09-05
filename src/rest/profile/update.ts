import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { Profile } from './types';
import { UserDocument } from '../../models/User';
import { prepareProfile } from './prepareProfile';

export const update: RequestHandler<ParamsDictionary, Profile> = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;
    const { name } = req.body;
    user.name = name;
    await user.save();

    res.send(prepareProfile(user));
  } catch (e) {
    next(e);
  }
};
