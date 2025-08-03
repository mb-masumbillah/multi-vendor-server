import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './router';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';

const app: Application = express();

// perser
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

//Application route
app.use('/api/v1', router);

app.get('/', async (_req: Request, res: Response) => {
  res.send('multi vendor project');
});

// global error
app.use(globalErrorHandler);

// api not found
app.use(notFound);

export default app;
