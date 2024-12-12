import rateLimit from 'express-rate-limit';
import { AppError } from '../../domain/entities/appError';

// General rate limiter
export const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later',
	headers: true,
	handler: (req, res, next) => {
		next(
			new AppError(
				429,
				'Too many requests from this IP, please try again later'
			)
		);
	},
});

// Stricter limiter for authentication routes
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 5 requests per windowMs
	message: 'Too many authentication attempts, please try again later',
	headers: true,
	handler: (req, res, next) => {
		next(
			new AppError(
				429,
				'Too many authentication attempts, please try again later'
			)
		);
	},
});
