import { Address, User } from "@prisma/client";
import { Request, Response } from "express";
import {
  AddAddressSchema,
  UpdateUserSchema,
  UserRoleSchema,
} from "../schema/users";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestsException } from "../exceptions/bad-request";

export const addAddress = async (req: Request, res: Response) => {
  AddAddressSchema.parse(req.body);
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  res.json({ success: true, data: address });
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const address = await prismaClient.address.delete({
      where: { id: +req.params.id },
    });
    res.json({ success: true });
  } catch (error) {
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: { userId: req.user?.id },
  });
  res.json({ success: true, data: addresses });
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;
  if (validatedData.defaultShippingAddressId) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddressId,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (shippingAddress.userId !== req.user?.id) {
      throw new BadRequestsException(
        "Address does not belong to user",
        ErrorCode.ADDRESS_NOT_FOR_USER
      );
    }
  }

  if (validatedData.defaultBillingAddressId) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddressId,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (billingAddress.userId !== req.user?.id) {
      throw new BadRequestsException(
        "Address does not belong to user",
        ErrorCode.ADDRESS_NOT_FOR_USER
      );
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: { id: req.user?.id },
    data: validatedData,
  });
  res.json({ success: true, updatedUser });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prismaClient.user.findMany({
    skip: +req.query.skip! || 0,
    take: 5,
  });
  res.json(users);
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.findFirstOrThrow({
      where: { id: +req.params.id },
      include: {
        addresses: true,
      },
    });
    res.json(user);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
export const changeUserRole = async (req: Request, res: Response) => {
  const validatedData = UserRoleSchema.parse(req.body);
  try {
    const user = await prismaClient.user.update({
      where: { id: +req.params.id },
      data: {
        role: validatedData.role,
      },
    });
    res.json(user);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
