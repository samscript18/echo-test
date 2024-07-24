import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../handlers/errorHandler";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "../controllers/cart";

export const cartRoutes: Router = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));
