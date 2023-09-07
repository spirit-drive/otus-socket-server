import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import { Profile } from './types';
import { UserDocument } from '../../models/User';
import { prepareProfile } from './prepareProfile';
import { DataBaseError, InvalidNickNameError } from '../../Errors';

export const update: RequestHandler<ParamsDictionary, Profile | Error> = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;
    const { name } = req.body;
    user.name = name;

    // Выполняем валидацию перед сохранением
    const validationError = user.validateSync();
    if (validationError) {
      // Если есть ошибки валидации, отправляем ValidationError
      res.status(400).send(new InvalidNickNameError(validationError.message));
    } else {
      // Если валидация успешна, сохраняем документ
      await user.save();
      res.send(prepareProfile(user));
    }
  } catch (e) {
    res.status(500).send(new DataBaseError(e));
  }
};
