import db from '.';
import { bakeries, reviews, products, users } from './schema';
import bakeriesSeed from './seedData/bakeriesSeed';
import reviewsSeed from './seedData/productReviewsSeed';
import usersSeed from './seedData/usersSeed';

const main = async () => {
  try {
    await db.delete(bakeries);
    await db.delete(users);
    await db.delete(products);

    await db.insert(bakeries).values(bakeriesSeed);
    await db.insert(users).values(usersSeed);
  } catch (error) {}
};

main();
