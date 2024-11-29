import {
	boolean,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { bakeriesTable } from './bakeries.schema';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 256 }).notNull(),
	lastName: varchar('last_name', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull(),
	emailVerified: boolean('email_verified').notNull().default(false),
	password: varchar('password', { length: 256 }).notNull(),
	passwordLastChangedAt: timestamp('password_last_changed_at')
		.notNull()
		.defaultNow(),
	lastLogin: timestamp('last_login').notNull().defaultNow(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const userFavoriteBakeriesTable = pgTable('user_favorite_bakeries', {
	id: serial('id').primaryKey(),
	userId: serial('user_id')
		.references(() => usersTable.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	bakeryId: serial('bakery_id')
		.references(() => bakeriesTable.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});