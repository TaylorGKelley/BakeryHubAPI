import {
	boolean,
	customType,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { bakeriesTable } from './bakeries.schema';
import bytea from './types/bytea';

export const recipesTable = pgTable('recipes', {
	id: serial('id').primaryKey(),
	bakeryId: serial('bakery_id').references(() => bakeriesTable.id, {
		onDelete: 'cascade',
	}),
	name: varchar('name', { length: 256 }).notNull(),
	isPublic: boolean('is_public').notNull().default(false),
	prepTime: integer('prep_time').notNull(),
	cookTime: integer('cook_time').notNull(),
	servings: integer('servings').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const recipeIngredientsTable = pgTable('recipe_ingredients', {
	id: serial('id').primaryKey(),
	recipeId: serial('recipe_id').references(() => recipesTable.id, {
		onDelete: 'cascade',
	}),
	name: varchar('name', { length: 256 }).notNull(),
	quantity: varchar('quantity', { length: 256 }).notNull(),
});

export const recipeStepsTable = pgTable('recipe_steps', {
	id: serial('id').primaryKey(),
	recipeId: serial('recipe_id').references(() => recipesTable.id, {
		onDelete: 'cascade',
	}),
	description: text('description').notNull(),
});

export const recipeImagesTable = pgTable('recipe_images', {
	id: serial('id').primaryKey(),
	recipeId: serial('recipe_id').references(() => recipesTable.id, {
		onDelete: 'cascade',
	}),
	image: bytea('image').notNull(),
	altText: varchar('alt_text', { length: 256 }).notNull(),
	order: integer('order').notNull(),
});

export const recipeNotesTable = pgTable('recipe_notes', {
	id: serial('id').primaryKey(),
	recipeId: serial('recipe_id').references(() => recipesTable.id, {
		onDelete: 'cascade',
	}),
	note: text('note').notNull(),
});
