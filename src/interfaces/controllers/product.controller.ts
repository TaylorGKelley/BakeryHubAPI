import { RequestHandler } from 'express';
import { DataResponse, GenericResponse } from '../../application/dtos/Response';
import { AppError } from '../../shared/errors/appError';
import { productsTable } from '../../infrastructure/database/drizzle/schema/products.schema';

export const getAllProducts: RequestHandler<
	{ bakeryId: number }, // req.params
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

export const getProduct: RequestHandler<
	{
		bakeryId: number;
		productId: number;
	}, // req.params
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

export const createProduct: RequestHandler<
	{ bakeryId: number }, // req.params
	DataResponse<any>, // res.json({})
	typeof productsTable.$inferInsert // req.body
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

export const updateProduct: RequestHandler<
	{
		bakeryId: number;
		productId: number;
	}, // req.params
	DataResponse<any>, // res.json({})
	typeof productsTable.$inferInsert // req.body
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

export const deleteProduct: RequestHandler<
	{
		bakeryId: number;
		productId: number;
	},
	GenericResponse
> = async (req, res, next) => {
	try {
		res.json({
			success: true,
			message: 'Product Successfully Deleted',
		});
	} catch (error) {
		next(error);
	}
};
