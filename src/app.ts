import express from 'express';
import { userRouter } from './routes/user';
import { status404 } from './middlewares/status404';
import { corsMiddleware } from './middlewares/cors';
import { publicacionRouter } from './routes/publication';
import { errorHandler } from './middlewares/errorHandler.js';

import config from '../config.json';

const app = express();
const PORT = config.development.server.port ?? 3000;

app.use(express.json());
app.use(corsMiddleware());
app.use('/users', userRouter);
app.use('/publications', publicacionRouter);
app.use(status404());
app.use(errorHandler);


app.listen(PORT, () => console.log(`App escuchando en http://localhost:${PORT}`));