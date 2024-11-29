import { users } from '../schema/users.schema';

export const usersSeed = [
	{
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		password: 'password123',
	},
] as (typeof users.$inferInsert)[];