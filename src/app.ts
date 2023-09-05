import * as express from 'express';
import * as cors from 'cors';
import * as passport from 'passport';
import config from './db.config';
import * as mongoose from 'mongoose';
import { setRoutes } from './rest/setRoutes';

(async () => {
  const app = express();

  const isDev = process.env.MODE !== 'production';

  await mongoose.connect(isDev ? config.db_dev : config.db);
  Object.assign(mongoose, { Promise: global.Promise });

  const port = parseInt(process.env.PORT) || 4001;

  app.use(passport.initialize());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  setRoutes(app);

  app.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}`));
})();
