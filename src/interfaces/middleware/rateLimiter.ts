import rateLimit from 'express-rate-limit';
import { AppError } from '../../shared/errors/appError';

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

// Specific limiter for refresh token endpoints
export const refreshTokenLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10, // Limit each IP to 10 refresh attempts per hour
	message: 'Too many refresh token attempts, please try again later',
	headers: true,
	handler: (req, res, next) => {
		next(
			new AppError(
				429,
				'Too many refresh token attempts, please try again later'
			)
		);
	},
});
