import { Express } from 'express';

export const setRoutes = (app: Express) => {
  app.get('/hello', (req, res) => {
    res.send('hello');
  });
};
