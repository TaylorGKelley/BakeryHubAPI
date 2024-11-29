import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { handleError } from './middleware/handleError';
import { handleInvalidRoute } from './middleware/handleInvalidRoute';
import bakeryRoutes from './router/bakery.router';
import productRoutes from './router/product.router';

const app = express();

const corsOptions: cors.CorsOptions = {
	origin: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

/* 
	Initializing Routes
*/
app.use('/bakeries', bakeryRoutes);
app.use('/bakeries/:bakeryId/products', productRoutes);
// app.use('/bakeries/:bakeryId/recipes', recipeRouter);
// app.use('/users', userRoutes);

// Handle Invalid Route - 404
app.use('*', handleInvalidRoute);
// Handle Errors
app.use(handleError);

export default app;
