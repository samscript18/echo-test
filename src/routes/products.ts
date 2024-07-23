import { Router } from "express";
import { errorHandler } from "../handlers/errorHandler";
import {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/product";
import { adminMiddleware } from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";

export const productsRoutes: Router = Router();

productsRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);
productsRoutes.get("/", [authMiddleware], errorHandler(getAllProducts));
productsRoutes.get("/:id", [authMiddleware], errorHandler(getProductById));
productsRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct)
);
productsRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct)
);
