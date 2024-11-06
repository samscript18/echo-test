import { NextFunction, Request, Response } from 'express';
import { UnAuthorizedException } from '../exceptions/unauthorized.exception';
import { ErrorCode } from '../exceptions/root';
import { prismaClient } from '..';
import jwtHelper from '../helpers/jwt.helper';
import { Admin } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      admin?: Admin;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
  try {
    const payload = await jwtHelper.verifyToken(token!);
    if (!payload.adminId) {
      next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }

    const admin = await prismaClient.admin.findFirst({
      where: { id: +payload.adminId },
    });

    if (!admin) {
      next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
    req.admin = admin!;

    next();
  } catch (error) {
    next(
      new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED, error)
    );
  }
};

export default authMiddleware;
