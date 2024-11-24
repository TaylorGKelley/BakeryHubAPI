import { Router } from 'express';
import db from '../db';
import { bakeries, bakeryMenuItems, bakeryMenuSections } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const allBakeries = await db
			.select()
			.from(bakeries)
			.innerJoin(
				bakeryMenuSections,
				eq(bakeries.id, bakeryMenuSections.bakeryId)
			);

		res.status(200).json({
			message: 'Success',
			data: allBakeries,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: (error as Error).message,
		});
	}
});

export default router;
