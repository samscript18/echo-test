import { Router } from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../handlers/errorHandler';
import authMiddleware from '../middlewares/auth';
import { adminMiddleware } from '../middlewares/admin';

export const authRoutes: Router = Router();

authRoutes.post('/signup', errorHandler(signup));
authRoutes.post('/login', errorHandler(login));
authRoutes.get('/me', [authMiddleware, adminMiddleware], errorHandler(me));
