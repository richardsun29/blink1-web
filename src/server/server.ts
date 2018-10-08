import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import Config from '../util/config';

import api from './routes/api';
import login from './routes/login';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/', login);

// frontend
app.use(express.static(path.join('dist', 'www')));

app.use('/api', api);

app.listen(Config.PORT, () => console.log(`Listening on port ${ Config.PORT }`));
