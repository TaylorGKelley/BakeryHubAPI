import { Router } from 'express';
import {
	getAllBakeries,
	getBakery,
	createBakery,
} from '../../controllers/bakery';

const router = Router();

router.get('/', getAllBakeries).post('/', createBakery);
router.get('/:bakeryId', getBakery);

export default router;
