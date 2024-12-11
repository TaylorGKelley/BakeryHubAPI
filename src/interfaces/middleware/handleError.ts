import { ErrorRequestHandler } from 'express';
import { AppError } from '../../domain/entities/appError';

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
	res.status(err instanceof AppError ? err.statusCode : 500).json({
		success: false,
		message: err.message,
		// stack: err.stack
	});
};
