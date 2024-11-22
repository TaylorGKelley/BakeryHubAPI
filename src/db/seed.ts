import db from '.';
import { bakeries, orders, productReviews, products, users } from './schema';
import bakeriesSeed from './seedData/bakeriesSeed';
import reviewsSeed from './seedData/productReviewsSeed';
import usersSeed from './seedData/usersSeed';

const main = async () => {
  try {
    await db.delete(bakeries);
    await db.delete(users);
    await db.delete(products);
    await db.delete(orders);

    await db.insert(bakeries).values(bakeriesSeed);
    await db.insert(users).values(usersSeed);
    await db.insert(productReviews).values(reviewsSeed);
  } catch (error) {}
};

main();
