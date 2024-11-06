import { Request, Response } from 'express';
import { prismaClient } from '../index';
import { hashPassword, comparePassword } from '../helpers/auth.helper';
import jwtHelper from '../helpers/jwt.helper';
import { SignUpSchema } from '../schema/admin';
import { BadRequestsException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/root';
import { NotFoundException } from '../exceptions/not-found';

export const signup = async (req: Request, res: Response) => {
  SignUpSchema.parse(req.body);
  const adminExists = await prismaClient.admin.findFirst({
    where: { email: req.body.email },
  });
  if (adminExists) {
    throw new BadRequestsException(
      'admin with this email already exists',
      ErrorCode.ADMIN_ALREADY_EXISTS
    );
  }
  const hashedPassword = await hashPassword(req.body.password);
  const admin = await prismaClient.admin.create({
    data: {
      password: hashedPassword,
      ...req.body,
    },
  });
  res.json({ admin });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let admin = await prismaClient.admin.findFirst({ where: { email } });
  if (!admin) {
    throw new NotFoundException(
      'Admin does not exist',
      ErrorCode.ADMIN_NOT_FOUND
    );
  }
  const isMatch = await comparePassword(password, admin.password!);
  if (!isMatch) {
    throw new BadRequestsException(
      'Incorrect password',
      ErrorCode.INCORRECT_PASSWORD
    );
  }
  const accessToken = await jwtHelper.generateToken(admin?.id.toString());
  res.json({ accessToken });
};

export const me = async (req: Request, res: Response) => {
  const admin = await prismaClient.admin.findFirst({
    where: { id: req.admin?.id },
  });
  res.json(admin);
};
