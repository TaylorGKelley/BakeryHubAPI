import { AppError } from '../../domain/entities/appError';
import { RequestHandler } from 'express';

const protectedRoute: RequestHandler = async (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			next();
		}

		res.redirect('/login');
	} catch (error) {
		next(
			new AppError((error as AppError)?.statusCode, (error as AppError).message)
		);
	}
};

export default protectedRoute;
