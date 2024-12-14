import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { handleError } from './interfaces/middleware/handleError';
import { handleInvalidRoute } from './interfaces/middleware/handleInvalidRoute';
import {
	userManagementRoutes,
	bakeryManagementRoutes,
	recipeManagementRoutes,
} from './interfaces/routers/me';
import {
	bakeryInfoRoutes,
	productInfoRoutes,
	recipeInfoRoutes,
} from './interfaces/routers/info';
import {
	authLimiter,
	generalLimiter,
} from './interfaces/middleware/rateLimiter';
import cookieParser from 'cookie-parser';
import configureSession from './interfaces/middleware/configureSession';
import passport from './infrastructure/configurations/passport';
import authRouter from './interfaces/routers/authRouter';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// Authentication
app.use(configureSession());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// CORS options
const corsOptions: cors.CorsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));

// Rate limiters
app.use(generalLimiter);
app.use('/auth/*', authLimiter);

/* 
	Initializing Routes
*/
// * Auth routes
app.use('/auth', authRouter);

// * Me routes
app.use('/me', userManagementRoutes);
app.use('/me/bakery', bakeryManagementRoutes);
app.use('/me/bakery/recipes', recipeManagementRoutes);
app.use('/me/bakery/products', recipeManagementRoutes);

// * Info Routes
app.use('/bakeries', bakeryInfoRoutes);
app.use('/bakeries/:bakeryId/products', productInfoRoutes);
app.use('/bakeries/:bakeryId/recipes', recipeInfoRoutes);

// Handle Invalid Route - 404
app.use('*', handleInvalidRoute);
// Handle Errors
app.use(handleError);

export default app;
