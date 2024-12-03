import {
	pgTable,
	serial,
	smallint,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';
import { productsTable } from './products.schema';
import { recipesTable } from './recipes.schema';

export const reviewsTable = pgTable('reviews', {
	id: serial('id').primaryKey(),
	userId: serial('user_id').references(() => usersTable.id),
	productId: serial('product_id').references(() => productsTable.id, {
		onDelete: 'cascade',
	}),
	recipeId: serial('recipe_id').references(() => recipesTable.id, {
		onDelete: 'cascade',
	}),
	rating: smallint('rating').notNull(),
	comment: text('comment').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});
