import { users } from '../schema';

export default [
	{
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		password: 'password123',
	},
] as (typeof users.$inferInsert)[];
