import { AppError } from '../../shared/errors/appError';
import { AuthenticatedRequestHandler } from '../../domain/types/Request/AuthenticatedRequestHandler';

export const protectedRoute: AuthenticatedRequestHandler = (
	req,
	_res,
	next
) => {
	try {
		if (req.user) {
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
