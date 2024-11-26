import express from 'express';
import cors from 'cors';
import bakeriesRouter from './router/bakeryRouter';
import bodyParser from 'body-parser';
import { GenericError } from './Errors/GenericError';
import { ErrorResponse } from './types/Response';

const app = express();

const corsOptions: cors.CorsOptions = {
	origin: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

/* 
	Initializing Routes
*/
app.use('/bakeries', bakeriesRouter);

// Handle Invalid Route - 404
app.use('*', (req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route not found',
	});
});

export default app;
