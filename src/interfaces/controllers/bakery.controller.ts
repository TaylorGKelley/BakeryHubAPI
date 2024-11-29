import { RequestHandler } from 'express';
import { DataResponse, GenericResponse } from '../../application/dtos/Response';
import { AppError } from '../../shared/errors/appError';
import { bakeriesTable } from '../../infrastructure/database/drizzle/schema/bakeries.schema';

export const getAllBakeries: RequestHandler<
	{},
	DataResponse<any> // res.json({})
> = async (req, res, next) => {
	try {
		res.json({
			success: true,
			message: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

export const getBakery: RequestHandler<
	{ bakeryId: number }, // req.params
	DataResponse<any> // res.json({})
> = async (req, res, next) => {
	try {
		const bakeryId = req.params.bakeryId;

		res.json({
			success: true,
			message: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

export const createBakery: RequestHandler<
	{},
	DataResponse<any>, // res.json({})
	typeof bakeriesTable.$inferInsert // req.body
> = async (req, res, next) => {
	try {
		res.json({
			success: true,
			message: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

export const updateBakery: RequestHandler<
	{ bakeryId: number }, // req.params
	DataResponse<any>, // res.json({})
	typeof bakeriesTable.$inferInsert // req.body
> = async (req, res, next) => {
	try {
		res.json({
			success: true,
			message: 'Success',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteBakery: RequestHandler<
	{ bakeryId: number },
	GenericResponse
> = async (req, res, next) => {
	try {
		if (req.params.bakeryId === 1) {
			throw new AppError(300, 'Cannot delete default bakery');
		}

		res.json({
			success: true,
			message: 'Bakery Successfully Deleted',
		});
	} catch (error) {
		next(error);
	}
};
