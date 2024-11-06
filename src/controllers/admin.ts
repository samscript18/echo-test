import { Request, Response } from 'express';
import { UpdateAdminSchema } from '../schema/admin';
import { prismaClient } from '..';

export const updateAdmin = async (req: Request, res: Response) => {
  const validatedData = UpdateAdminSchema.parse(req.body);
  const updatedUser = await prismaClient.admin.update({
    where: { id: req.admin?.id },
    data: validatedData,
  });
  res.json({ success: true, updatedUser });
};
