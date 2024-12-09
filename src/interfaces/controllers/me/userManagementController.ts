import { AuthenticatedRequestHandler } from '../../../domain/types/Request/AuthenticatedRequestHandler';

export const getMyInfo: AuthenticatedRequestHandler = async (
	req,
	res,
	next
) => {
	res.status(200).json({
		success: true,
		message: 'User fetched successfully',
		data: req.user,
	});
};

export const updateMyInfo: AuthenticatedRequestHandler = async (
	req,
	res,
	next
) => {
	res.status(200).json({
		success: true,
		message: 'User updated successfully',
		data: req.user,
	});
};
