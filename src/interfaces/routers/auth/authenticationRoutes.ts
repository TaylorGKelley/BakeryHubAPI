import { Router } from 'express';
import { login } from '../../controllers/auth/emailAuthenticationController';

const auth = Router();

auth.post('/login', login);

export default auth;
