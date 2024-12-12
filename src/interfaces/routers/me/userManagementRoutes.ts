import { Router } from 'express';
import protectedRoute from '../../middleware/protectedRoute';
import { RequestHandler } from 'express';
import {
	getMyInfo,
	updateMyInfo,
} from '../../controllers/me/userManagementController';

const userManagement = Router();

userManagement.get('/', protectedRoute, getMyInfo);
userManagement.put('/', protectedRoute, updateMyInfo);

export default userManagement;
