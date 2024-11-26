import { RequestHandler } from 'express';
import { DataResponse } from '../types/Response';
import { GenericError } from '../Errors/GenericError';

export const getAllBakeries: RequestHandler<
	{},
	DataResponse<string>,
	{},
	{ title: string }
> = async (req, res, next) => {
	try {
		res.json({
			success: true,
			message: 'Success',
		});
	} catch (error) {
		next(new GenericError('Test Error', (error as Error).message, 500));
	}
};
