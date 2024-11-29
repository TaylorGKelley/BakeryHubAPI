import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts).post('/', createProduct);
router.get('/:productId', getProduct, updateProduct, deleteProduct);

export default router;
