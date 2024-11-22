import { pgTable, serial } from 'drizzle-orm/pg-core';
import { products, recipes } from '../schema';

export default pgTable('reviews', {
  id: serial('id').primaryKey(),
  productId: serial('product_id').references(() => products.id, {
    onDelete: 'cascade',
  }),
  recipeId: serial('recipe_id').references(() => recipes.id, {
    onDelete: 'cascade',
  }),
});
