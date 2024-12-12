import { RequestHandler } from 'express';

export const getMyInfo: RequestHandler = async (req, res, next) => {
	res.status(200).json({
		success: true,
		message: 'User fetched successfully',
		data: req.user,
	});
};

export const updateMyInfo: RequestHandler = async (req, res, next) => {
	res.status(200).json({
		success: true,
		message: 'User updated successfully',
		data: req.user,
	});
};
