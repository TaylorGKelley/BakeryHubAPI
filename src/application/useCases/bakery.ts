import { FindAllBakeriesResponse } from '../../domain/entities/bakery/findAllBakeries';
import db from '../../infrastructure/database/drizzle';
import { bakeriesTable } from '../../infrastructure/database/drizzle/schema';

export async function findAllBakeries(selectColumns?: any) {
	return (await db
		.select(selectColumns)
		.from(bakeriesTable)) as FindAllBakeriesResponse;
}
