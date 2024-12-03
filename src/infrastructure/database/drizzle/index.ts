import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { bakeriesTable } from './schema/bakeries.schema';
import { usersTable } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const db = drizzle(pool);

type DbSchema = {
  bakeries: typeof bakeriesTable;
  users: typeof usersTable;
};

export const dbType: DbSchema = {
  bakeries: bakeriesTable,
  users: usersTable,
};

export default db;
