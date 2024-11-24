import {
	boolean,
	decimal,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { bakeries } from './bakeries';
import bytea from './types/bytea';

export const products = pgTable('products', {
	id: serial('id').primaryKey(),
	bakeryId: serial('bakery_id')
		.references(() => bakeries.id)
		.notNull(),
	name: varchar('name', { length: 256 }).notNull(),
	price: decimal('price', { precision: 5, scale: 2 }).notNull(),
	description: text('description').notNull(),
	isPublic: boolean('is_public').notNull().default(false),
	servingSize: varchar('serving_size', { length: 256 }).notNull(),
	servingQuantity: integer('serving_quantity').notNull(),
	caloriesPerServing: integer('calories_per_serving').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const productImages = pgTable('product_images', {
	id: serial('id').primaryKey(),
	productId: serial('product_id')
		.references(() => products.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	image: bytea('image').notNull(),
	altText: varchar('alt_text', { length: 256 }).notNull(),
	order: integer('order').notNull(),
});

export const productIngredients = pgTable('product_ingredients', {
	id: serial('id').primaryKey(),
	productId: serial('product_id')
		.references(() => products.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	ingredient: varchar('ingredient', { length: 256 }).notNull(),
	order: integer('order').notNull(),
});
