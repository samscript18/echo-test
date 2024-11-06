import { Router } from 'express';
import { authRoutes } from './auth';
import { adminRoutes } from './admin';

export const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/user', adminRoutes);
