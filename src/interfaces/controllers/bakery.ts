import { RequestHandler } from 'express';
import { DataResponse } from '../../application/dtos/Response';
import { bakeriesTable } from '../../infrastructure/database/drizzle/schema/bakeries.schema';
import { findAllBakeries } from '../../application/useCases/bakery';

export const getAllBakeries: RequestHandler<
	{},
	DataResponse<any> // res.json({})
> = async (req, res, next) => {
	try {
		const bakeries = await findAllBakeries();

		res.json({
			success: true,
			message: 'Success',
			data: bakeries,
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
