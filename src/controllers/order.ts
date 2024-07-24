import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Order } from "@prisma/client";
import { UnAuthorizedException } from "../exceptions/unauthorized.exception";

export const createOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: req.user?.id,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length === 0) {
      return res.json({ message: "cart is empty" });
    }
    const price = cartItems.reduce((acc, curr) => {
      return acc + curr.quantity * +curr.product.price;
    }, 0);
    const address = await tx.address.findFirst({
      where: { id: req.user?.defaultShippingAddressId! },
    });
    const order = await tx.order.create({
      data: {
        userId: req.user?.id!,
        netAmount: price,
        address: address?.formattedAddress!,
        products: {
          create: cartItems.map((item) => {
            return {
              productId: item.productId,
              quantity: item.quantity,
            };
          }),
        },
      },
    });
    await tx.orderEvent.create({
      data: {
        orderId: order.id,
      },
    });
    await tx.cartItem.deleteMany({
      where: { userId: req.user?.id },
    });
    return res.json(order);
  });
};
export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prismaClient.order.findMany({
    where: { userId: req.user?.id },
  });
  res.json(orders);
};
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: { id: +req.params.id },
      include: {
        products: true,
        events: true,
      },
    });
    res.json(order);
  } catch (error) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};
export const cancelOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    let orderFound: Order;
    try {
      orderFound = await tx.order.findFirstOrThrow({
        where: { id: +req.params.id },
      });
    } catch (error) {
      throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
    if (orderFound?.userId !== req.user?.id) {
      throw new UnAuthorizedException(
        "Unauthorized to cancel this order",
        ErrorCode.UNAUTHORIZED
      );
    }
    const order = await tx.order.update({
      where: { id: +req.params.id },
      data: {
        status: "CANCELLED",
      },
    });
    await tx.orderEvent.create({
      data: {
        orderId: order.id,
        status: "CANCELLED",
      },
    });
    return res.json(order);
  });
};

export const listAllOrders = async (req: Request, res: Response) => {
  let whereClause: any = {};
  const status = req.query.status;
  if (status) {
    whereClause = {
      status,
    };
  }
  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: +req.query.skip! || 0,
    take: 5,
  });
  res.json(orders);
};
export const listUserOrders = async (req: Request, res: Response) => {
  let whereClause: any = {
    userId: +req.params.id,
  };
  const status = req.query.status;
  if (status) {
    whereClause = {
      ...whereClause,
      status,
    };
  }
  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: +req.query.skip! || 0,
    take: 5,
  });
  res.json(orders);
};
export const changeStatus = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    let order: Order;
    try {
      order = await tx.order.findFirstOrThrow({
        where: { id: +req.params.id },
      });
    } catch (error) {
      throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
    order = await tx.order.update({
      where: { id: +req.params.id },
      data: {
        status: req.body.status.toUpperCase(),
      },
    });
    await tx.orderEvent.create({
      data: {
        orderId: order.id,
        status: req.body.status.toUpperCase(),
      },
    });
    return res.json(order);
  });
};
