import { Router } from "express";
import { authRoutes } from "./auth";
import { productsRoutes } from "./products";
import { userRoutes } from "./user";
import { cartRoutes } from "./cart";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/cart", cartRoutes);
