import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unathorized.exception";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import jwtHelper from "../helpers/jwt.helper";
import { User } from "@prisma/client";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

declare global {
  namespace Express {
    interface Request {
      user?: User;
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
    next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
  try {
    const payload = await jwtHelper.verifyToken(token!);
    if (!payload.userId) {
      next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }

    const user = await prismaClient.user.findFirst({
      where: { id: +payload.userId },
    });

    if (!user) {
      next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
    req.user = user!;

    next();
  } catch (error) {
    next(
      new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED, error)
    );
  }
};

export default authMiddleware;
