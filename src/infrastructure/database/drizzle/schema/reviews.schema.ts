import {
	pgTable,
	serial,
	smallint,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';
import { products } from './products.schema';
import { recipes } from './recipes.schema';

export const reviews = pgTable('reviews', {
	id: serial('id').primaryKey(),
	userId: serial('user_id').references(() => usersTable.id),
	productId: serial('product_id').references(() => products.id, {
		onDelete: 'cascade',
	}),
	recipeId: serial('recipe_id').references(() => recipes.id, {
		onDelete: 'cascade',
	}),
	rating: smallint('rating').notNull(),
	comment: text('comment').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});
