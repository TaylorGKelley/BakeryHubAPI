import { RequestHandler, Router } from 'express';
import {
	emailLogin,
	emailRegister,
	refreshToken,
} from '../../controllers/auth/authenticationController';
import protectedRoute from '../../middleware/protectedRoute';

const auth = Router();

auth.post('/register', emailRegister);
auth.post('/login', emailLogin);

auth.post('/refresh', protectedRoute, refreshToken as RequestHandler);

export default auth;
