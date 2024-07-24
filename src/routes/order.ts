import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../handlers/errorHandler";
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getAllOrders,
  getOrderById,
  listAllOrders,
  listUserOrders,
} from "../controllers/order";
import { adminMiddleware } from "../middlewares/admin";

export const orderRoutes: Router = Router();

orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));
orderRoutes.get("/", [authMiddleware], errorHandler(getAllOrders));
orderRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));
orderRoutes.get(
  "/index",
  [authMiddleware, adminMiddleware],
  errorHandler(listAllOrders)
);
orderRoutes.get(
  "/user/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(listUserOrders)
);
orderRoutes.put(
  "/:id/status",
  [authMiddleware, adminMiddleware],
  errorHandler(changeStatus)
);
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));
