import express from 'express';
import path from 'path';

import { PORT } from '../util/config';

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../www')));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
