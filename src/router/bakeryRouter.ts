import { Router } from 'express';
import { getAllBakeries } from '../controllers/bakeryController';

const router = Router();

router.get('/', getAllBakeries);

export default router;
