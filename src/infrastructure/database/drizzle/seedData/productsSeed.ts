import {
	productImages,
	productIngredients,
	products,
} from '../schema/products.schema';
import { strawberryShortcakeImage } from './data/imagesBase';

export const productsSeed = [
	{
		id: 1,
		bakeryId: 1,
		name: 'Strawberry Shortcake',
		price: '9.99',
		description: 'A delicious strawberry shortcake',
		isPublic: true,
		servingSize: '8 oz slice',
		servingQuantity: 6,
		caloriesPerServing: 400,
	},
] as (typeof products.$inferInsert)[];

export const productImagesSeed = [
	{
		productId: 1,
		image: strawberryShortcakeImage,
		altText: 'Strawberry Shortcake Image',
		order: 1,
	},
] as (typeof productImages.$inferInsert)[];

export const productIngredientsSeed = [
	{
		productId: 1,
		ingredient: 'Strawberries',
		order: 1,
	},
	{
		productId: 1,
		ingredient: 'Shortcake',
		order: 2,
	},
] as (typeof productIngredients.$inferInsert)[];
