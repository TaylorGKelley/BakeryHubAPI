import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const bakeries = pgTable('bakeries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  city: varchar('city', { length: 256 }).notNull(),
  state: varchar('state', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const users = pgTable('users', {
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

export const products = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const productReviews = pgTable('review', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  productId: serial('product_id').notNull(),
  rating: serial('rating').notNull(),
  comment: varchar('comment', { length: 256 }).notNull(),
});

export const orders = pgTable('order', {
  id: serial('id').primaryKey(),
  // bakeryId: serial('bakery_id').notNull(),
  // userId: serial('user_id').notNull(),
  // productId: serial('product_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
