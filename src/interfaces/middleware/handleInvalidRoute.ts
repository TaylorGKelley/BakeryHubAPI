import { RequestHandler } from 'express';

export const handleInvalidRoute: RequestHandler = (req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route not found',
	});
};
