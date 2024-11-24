import {
	pgTable,
	serial,
	smallint,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { products } from './products';
import { recipes } from './recipes';

export const reviews = pgTable('reviews', {
	id: serial('id').primaryKey(),
	userId: serial('user_id').references(() => users.id),
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
