import express from 'express';
import * as path from 'path';
const PORT = process.env.PORT || 5000;

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../www')));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
console.log();
