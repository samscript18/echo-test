import { Router } from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../handlers/errorHandler';
import authMiddleware from '../middlewares/auth';
import { adminMiddleware } from '../middlewares/admin';

export const authRoutes: Router = Router();

authRoutes.post('/signup', [adminMiddleware], errorHandler(signup));
authRoutes.post('/login', [adminMiddleware], errorHandler(login));
authRoutes.get('/me', [authMiddleware, adminMiddleware], errorHandler(me));
