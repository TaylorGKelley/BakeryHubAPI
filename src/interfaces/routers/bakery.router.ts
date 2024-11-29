import { Router } from 'express';
import {
	getAllBakeries,
	getBakery,
	createBakery,
	updateBakery,
	deleteBakery,
} from '../controllers/bakery.controller';

const router = Router();

router.get('/', getAllBakeries).post('/', createBakery);
router
	.get('/:bakeryId', getBakery)
	.patch('/:bakeryId', updateBakery)
	.delete('/:bakeryId', deleteBakery);

export default router;
