import {
	decimal,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { products } from './products';
import bytea from './types/bytea';

export const bakeries = pgTable('bakeries', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	about: text('about').notNull(),
	// Address
	addressLine1: varchar('address_line_1', { length: 256 }).notNull(),
	addressLine2: varchar('address_line_2', { length: 256 }),
	city: varchar('city', { length: 256 }).notNull(),
	state: varchar('state', { length: 256 }).notNull(),
	zipCode: integer('zip_code').notNull(),
	lat: decimal('lat', { precision: 9, scale: 6 }).notNull(),
	lng: decimal('lng', { precision: 9, scale: 6 }).notNull(),
	// Contact
	contactPhoneNumber: varchar('contact_phone_number', {
		length: 256,
	}).notNull(),
	// Time stamps
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const bakeryMenuSections = pgTable('bakery_menu_sections', {
	id: serial('id').primaryKey(),
	bakeryId: serial('bakery_id')
		.references(() => bakeries.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	title: varchar('title', { length: 256 }).notNull(),
	order: integer('order').notNull(),
});

export const bakeryMenuItems = pgTable('bakery_menu_items', {
	id: serial('id').primaryKey(),
	bakeryMenuSectionId: serial('bakery_menu_section_id')
		.references(() => bakeryMenuSections.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	productId: serial('product_id').references(() => products.id, {
		onDelete: 'cascade',
	}),
});

export const bakeryImages = pgTable('bakery_images', {
	id: serial('id').primaryKey(),
	bakeryId: serial('bakery_id')
		.references(() => bakeries.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	image: bytea('image').notNull(),
	altText: varchar('alt_text', { length: 256 }).notNull(),
	order: integer('order').notNull(),
});

export const bakeryFavorites = pgTable('bakery_favorites', {
	id: serial('id').primaryKey(),
	bakeryId: serial('bakery_id')
		.references(() => bakeries.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	userId: serial('user_id')
		.references(() => bakeries.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});
