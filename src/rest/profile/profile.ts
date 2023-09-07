import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { Profile } from './types';
import { prepareProfile } from './prepareProfile';
import { UserDocument } from '../../models/User';

export const profile: RequestHandler<ParamsDictionary, Profile | Error> = async (req, res) => {
  try {
    res.send(prepareProfile(req.user as UserDocument));
  } catch (e) {
    res.status(400).send(e);
  }
};
