import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { Profile } from './types';
import { UserDocument } from '../../models/User';
import { prepareProfile } from './prepareProfile';
import { DataBaseError } from '../../Errors';

export const update: RequestHandler<ParamsDictionary, Profile | Error> = async (req, res) => {
  try {
    const user = req.user as UserDocument;
    const { name } = req.body;
    user.name = name;
    await user.save();

    res.send(prepareProfile(user));
  } catch (e) {
    res.status(400).send(new DataBaseError(e));
  }
};
