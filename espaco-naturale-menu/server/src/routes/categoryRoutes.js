import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const categoryRoutes = Router();

categoryRoutes.get("/", asyncHandler(categoryController.index));
categoryRoutes.post("/", authMiddleware, asyncHandler(categoryController.create));
categoryRoutes.put("/:id", authMiddleware, asyncHandler(categoryController.update));
categoryRoutes.delete("/:id", authMiddleware, asyncHandler(categoryController.remove));

export default categoryRoutes;
