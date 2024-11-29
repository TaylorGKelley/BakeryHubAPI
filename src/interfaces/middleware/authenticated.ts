import { RequestHandler } from 'express';
import { AppError } from '../../shared/errors/appError';

export const authenticated: RequestHandler<
	any,
	any,
	any,
	any,
	{ user: { id: number } }
> = (req, res, next) => {
	try {
		if (req.app.locals.user) {
			next();
		} else {
			throw new AppError(401, 'Unauthorized');
		}
	} catch (error) {
		next(
			new AppError((error as AppError)?.statusCode, (error as AppError).message)
		);
	}
};
