import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const sessionTable = pgTable('session', {
	sid: text('sid').primaryKey(),
	session_data: jsonb('session_data').notNull(),
	expires: timestamp('expires'),
});
