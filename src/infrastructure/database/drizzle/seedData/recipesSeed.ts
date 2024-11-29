import {
	recipeImages,
	recipeIngredients,
	recipes,
	recipeSteps,
} from '../schema/recipes.schema';
import { strawberryShortcakeImage } from './data/imagesBase';

export const recipesSeed = [
	{
		bakeryId: 1,
		name: 'Strawberry Shortcake',
		isPublic: true,
		prepTime: 30,
		cookTime: 45,
		servings: 8,
	},
] as (typeof recipes.$inferInsert)[];

export const recipeIngredientsSeed = [
	{
		recipeId: 1,
		name: 'Strawberries',
		quantity: '2 cups',
	},
	{
		recipeId: 1,
		name: 'Sugar',
		quantity: '1 cup',
	},
	{
		recipeId: 1,
		name: 'Eggs',
		quantity: '2',
	},
	{
		recipeId: 1,
		name: 'Flour',
		quantity: '2 cups',
	},
] as (typeof recipeIngredients.$inferInsert)[];

export const recipeStepsSeed = [
	{
		recipeId: 1,
		description: 'Cook the strawberries',
	},
	{
		recipeId: 1,
		description: 'Make the batter',
	},
	{
		recipeId: 1,
		description: 'Bake the cake',
	},
] as (typeof recipeSteps.$inferInsert)[];

export const recipeImagesSeed = [
	{
		recipeId: 1,
		image: strawberryShortcakeImage,
		altText: 'Strawberry Shortcake Image',
		order: 1,
	},
] as (typeof recipeImages.$inferInsert)[];

export const recipeNotesSeed = [
	{
		recipeId: 1,
		note: 'Try to use fresh strawberries for the best flavor.',
	},
];
