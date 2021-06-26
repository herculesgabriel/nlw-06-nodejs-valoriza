import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import './database';

import express from 'express';

import { routes } from './routes';
import { errorHandler } from './utils/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
