import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'byron Investimentos API',
}));

app.get('/ping', (_req: Request, res: Response) => res.json({ pong: true }));
app.use(router);
app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 3333;
app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});


