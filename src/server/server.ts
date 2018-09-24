import express from 'express';
import morgan from 'morgan';
import path from 'path';

import Config from '../util/config';

import api from './routes/api';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, '../www')));

// api
app.use('/api', api);

app.listen(Config.PORT, () => console.log(`Listening on ${ Config.PORT }`));
