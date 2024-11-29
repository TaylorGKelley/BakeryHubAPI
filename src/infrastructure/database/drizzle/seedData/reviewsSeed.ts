import { reviews } from '../schema/reviews.schema';

export const reviewsSeed = [
	{
		productId: 1,
		rating: 5,
		comment: 'This was delicious!',
	},
] as (typeof reviews.$inferInsert)[];
