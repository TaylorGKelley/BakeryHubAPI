import db from '.';
import {
	bakeries,
	bakeryMenuSections,
	bakeryMenuItems,
	bakeryImages,
	bakeryFavorites,
	products,
	productImages,
	recipes,
	recipeIngredients,
	recipeSteps,
	recipeImages,
	reviews,
	users,
} from './schema';
import {
	bakeriesSeed,
	bakeryFavoritesSeed,
	bakeryImagesSeed,
	bakeryMenuItemsSeed,
	bakeryMenuSectionsSeed,
} from './seedData/bakeriesSeed';
import { productImagesSeed, productsSeed } from './seedData/productsSeed';
import {
	recipeImagesSeed,
	recipeIngredientsSeed,
	recipesSeed,
	recipeStepsSeed,
} from './seedData/recipesSeed';
import { reviewsSeed } from './seedData/reviewsSeed';
import { usersSeed } from './seedData/usersSeed';

async function main() {
	try {
		await db.delete(bakeries);
		await db.delete(bakeryMenuSections);
		await db.delete(bakeryMenuItems);
		await db.delete(bakeryImages);
		await db.delete(bakeryFavorites);
		await db.delete(products);
		await db.delete(productImages);
		await db.delete(recipes);
		await db.delete(recipeIngredients);
		await db.delete(recipeSteps);
		await db.delete(recipeImages);
		await db.delete(reviews);
		await db.delete(users);

		await db.insert(bakeries).values(bakeriesSeed);
		await db.insert(products).values(productsSeed);
		await db.insert(recipes).values(recipesSeed);
		await db.insert(users).values(usersSeed);
		await db.insert(reviews).values(reviewsSeed);
		await db.insert(bakeryMenuSections).values(bakeryMenuSectionsSeed);
		await db.insert(bakeryMenuItems).values(bakeryMenuItemsSeed);
		await db.insert(bakeryImages).values(bakeryImagesSeed);
		await db.insert(bakeryFavorites).values(bakeryFavoritesSeed);
		await db.insert(productImages).values(productImagesSeed);
		await db.insert(recipeIngredients).values(recipeIngredientsSeed);
		await db.insert(recipeSteps).values(recipeStepsSeed);
		await db.insert(recipeImages).values(recipeImagesSeed);
	} catch (error) {
		console.error(error);
	}
}

main();
process.exit();
