import express from 'express';
import path from 'path';

import Config from '../util/config';

import MessageSender from '../util/message-sender';

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../www')));

app.listen(Config.PORT, () => console.log(`Listening on ${ Config.PORT }`));
