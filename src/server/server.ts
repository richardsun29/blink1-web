import express from 'express';
import path from 'path';

import bodyParser from 'body-parser';
import morgan from 'morgan';

import Config from '../util/config';

import api from './routes/api';

import MessageSender from '../util/message-sender';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// frontend
app.use(express.static(path.join(__dirname, '../www')));

// api
app.use('/api', api);

app.listen(Config.PORT, () => console.log(`Listening on ${ Config.PORT }`));
