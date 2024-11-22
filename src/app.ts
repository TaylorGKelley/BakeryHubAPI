import express from 'express';
import bakeriesRouter from './router/bakeriesRouter';

const app = express();
app.use(express.json());

app.use(bakeriesRouter);

export default app;
