import { Request, Response } from 'express';
import { UpdateAdminSchema } from '../schema/admin';
import { prismaClient } from '..';

export const updateAdmin = async (req: Request, res: Response) => {
  const validatedData = UpdateAdminSchema.parse(req.body);
  const updatedAdmin = await prismaClient.admin.update({
    where: { id: req.admin?.id },
    data: validatedData,
  });
  const { password, ...rest } = updatedAdmin;
  res.json({ success: true, rest });
};
