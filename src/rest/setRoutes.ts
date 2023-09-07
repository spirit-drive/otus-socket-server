import { Express } from 'express';
import { signup } from './profile/signup';
import { signin } from './profile/signin';
import { profile } from './profile/profile';
import { update } from './profile/update';
import { authentication } from './authentication';

export const setRoutes = (app: Express) => {
  app.get('/hello', (_, res) => {
    res.send('hello');
  });

  app.get('/profile', authentication, profile);

  app.post('/profile', authentication, update);

  app.post('/signup', signup);

  app.post('/signin', signin);
};
