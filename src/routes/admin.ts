import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../handlers/errorHandler';
import { updateAdmin } from '../controllers/admin';
import { adminMiddleware } from '../middlewares/admin';

export const adminRoutes: Router = Router();

adminRoutes.put(
  '/profile',
  [authMiddleware, adminMiddleware],
  errorHandler(updateAdmin)
);
