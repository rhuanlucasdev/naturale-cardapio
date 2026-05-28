import { Router } from "express";
import { login, me } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authRoutes = Router();

authRoutes.post("/login", asyncHandler(login));
authRoutes.get("/me", authMiddleware, asyncHandler(me));

export default authRoutes;
