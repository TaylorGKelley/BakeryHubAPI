import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
<<<<<<< HEAD
=======
import { bakeriesTable } from './schema/bakeries.schema';
import { usersTable } from './schema';
>>>>>>> origin/HEAD

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const db = drizzle(pool);

<<<<<<< HEAD
=======
type DbSchema = {
  bakeries: typeof bakeriesTable;
  users: typeof usersTable;
};

export const dbType: DbSchema = {
  bakeries: bakeriesTable,
  users: usersTable,
};

>>>>>>> origin/HEAD
export default db;
