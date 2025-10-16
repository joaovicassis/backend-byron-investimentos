import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => res.json({ pong: true }));
app.use(router);
app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 3333;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP server running on port ${port}`);
});


