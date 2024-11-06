import express, { Express } from 'express';
import secrets from './constants/secrets.const';
import { rootRouter } from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/error';

const app: Express = express();

app.use(express.json());
app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({});

app.use(errorMiddleware);

const port = secrets.port;
app.listen(port, () => {
  console.log(`⚡[server]: connected successfully on http://localhost:${port}`);
});
