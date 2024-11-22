import { bakeries } from '../schema';

export default [
	{
		name: 'Royal Rolls Bakery',
		city: 'San Francisco',
		state: 'CA',
	},
	{
		name: 'Bread Shop',
		city: 'San Francisco',
		state: 'CA',
	},
] as (typeof bakeries.$inferInsert)[];
