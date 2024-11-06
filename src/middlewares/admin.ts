import { NextFunction, Request, Response } from 'express';
import { UnAuthorizedException } from '../exceptions/unauthorized.exception';
import { ErrorCode } from '../exceptions/root';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.admin?.role;
  if (role === 'ADMIN') {
    next();
  } else {
    next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
};
