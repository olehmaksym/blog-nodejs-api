import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './config';

import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';

import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
  if (err) {
    throw err;
  }

  console.log('🔶 Mongo connected');
})

app.listen(config.port, err => {
  if (err) throw err;

  console.log('🔶 Server listened on port', config.port);
})

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}));

app.use('/api', authRoute);
app.use('/api', checkToken, userRoute);
app.use(getUser);
app.use('/api', checkToken, pageRoute);

app.use(errorHandler);