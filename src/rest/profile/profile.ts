import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { Profile } from './types';
import { prepareProfile } from './prepareProfile';
import { UserDocument } from '../../models/User';

export const profile: RequestHandler<ParamsDictionary, Profile> = async (req, res) => {
  res.send(prepareProfile(req.user as UserDocument));
};
