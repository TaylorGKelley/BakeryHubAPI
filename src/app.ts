import express from 'express';
import bakeriesRouter from './router/bakeriesRouter';

const app = express();
app.use(express.json());

app.use('/bakeries', bakeriesRouter);

export default app;
