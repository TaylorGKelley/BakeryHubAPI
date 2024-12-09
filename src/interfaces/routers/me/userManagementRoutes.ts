import { Router } from 'express';
import protectedRoute from '../../middleware/protectedRoute';
import { RequestHandler } from 'express';
import {
	getMyInfo,
	updateMyInfo,
} from '../../controllers/me/userManagementController';

const userManagement = Router();

userManagement.get('/', protectedRoute, getMyInfo as RequestHandler);
userManagement.put('/', protectedRoute, updateMyInfo as RequestHandler);

export default userManagement;
