import { Router } from "express";
import authRoutes from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";

const routes = Router();

routes.get("/health", (request, response) => {
  response.json({ status: "ok" });
});

routes.use("/auth", authRoutes);
routes.use("/categories", categoryRoutes);
routes.use("/products", productRoutes);

export default routes;
