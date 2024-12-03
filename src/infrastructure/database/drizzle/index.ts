import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { bakeriesTable } from './schema/bakeries.schema';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
});
const db = drizzle(pool);

type DbSchema = {
	bakeries: typeof bakeriesTable;
};

export const dbType: DbSchema = {
	bakeries: bakeriesTable,
};

export default db;
