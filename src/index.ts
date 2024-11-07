import express, { Express } from 'express';
import secrets from './constants/secrets.const';
import { rootRouter } from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/error';
import * as swaggerUI from 'swagger-ui-express';
import * as YAML from 'yamljs';

const app: Express = express();

app.use(express.json());
app.use('/api', rootRouter);
app.get('/', (req, res) => {
  res.send('<h1>Echo-Test API</h1>');
});
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export const prismaClient = new PrismaClient({});

app.use(errorMiddleware);

const port = secrets.port;
app.listen(port, () => {
  console.log(`⚡[server]: connected successfully on http://localhost:${port}`);
});
