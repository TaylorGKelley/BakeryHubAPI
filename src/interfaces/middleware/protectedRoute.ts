import passport from 'passport';
import { RequestHandler } from 'express';
import { AppError } from '../../domain/entities/appError';
import { ProtectedUser } from '../../domain/entities/User';

const protectedRoute: RequestHandler = async (req, res, next) => {
	try {
		console.log(req.isAuthenticated(), (req.user as ProtectedUser)?.email);
		if (req.isAuthenticated() && req.user) {
			next();
		} else {
			throw new AppError(401, 'Not Authorized to view this route');
		}
	} catch (error) {
		next(error);
	}
};

export default protectedRoute;
