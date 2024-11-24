import {
	bakeries,
	bakeryMenuSections,
	bakeryMenuItems,
	bakeryImages,
	bakeryFavorites,
} from '../schema/bakeries';
import { strawberryShortcakeImage } from './data/imagesBase';

export const bakeriesSeed = [
	{
		id: 1,
		name: 'Royal Rolls Bakery',
		about:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
		addressLine1: '123 Main St',
		city: 'New York City',
		state: 'NY',
		zipCode: 10001,
		lat: '34.1234',
		lng: '23.1234',
		contactPhoneNumber: '123-456-7890',
	},
] as (typeof bakeries.$inferInsert)[];

export const bakeryMenuSectionsSeed = [
	{
		id: 1,
		bakeryId: 1,
		title: 'Cakes',
		order: 1,
	},
] as (typeof bakeryMenuSections.$inferInsert)[];

export const bakeryMenuItemsSeed = [
	{
		bakeryMenuSectionId: 1,
		productId: 1,
	},
] as (typeof bakeryMenuItems.$inferInsert)[];

export const bakeryImagesSeed = [
	{
		bakeryId: 1,
		image: strawberryShortcakeImage,
		altText: 'Strawberry Shortcake Image',
		order: 1,
	},
] as (typeof bakeryImages.$inferInsert)[];

export const bakeryFavoritesSeed = [
	{
		bakeryId: 1,
		userId: 1,
	},
] as (typeof bakeryFavorites.$inferInsert)[];
