import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/infrastructure/database/drizzle/schema',
	dialect: 'postgresql',
	out: './src/infrastructure/database/drizzle/migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
