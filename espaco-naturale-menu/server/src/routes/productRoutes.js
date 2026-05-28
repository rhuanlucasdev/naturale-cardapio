import { Router } from "express";
import * as productController from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const productRoutes = Router();

productRoutes.get("/", asyncHandler(productController.index));
productRoutes.get("/featured", asyncHandler(productController.featured));
productRoutes.post("/", authMiddleware, asyncHandler(productController.create));
productRoutes.put("/:id", authMiddleware, asyncHandler(productController.update));
productRoutes.patch("/:id/availability", authMiddleware, asyncHandler(productController.availability));
productRoutes.patch("/:id/featured", authMiddleware, asyncHandler(productController.toggleFeatured));
productRoutes.delete("/:id", authMiddleware, asyncHandler(productController.remove));

export default productRoutes;
