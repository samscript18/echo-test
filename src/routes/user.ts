import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../handlers/errorHandler";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getAllUsers,
  getUserById,
  listAddress,
  updateUser,
} from "../controllers/user";
import { adminMiddleware } from "../middlewares/admin";

export const userRoutes: Router = Router();

userRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
userRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);
userRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
userRoutes.put("/", [authMiddleware], errorHandler(updateUser));
userRoutes.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(getAllUsers)
);
userRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);
userRoutes.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole)
);
