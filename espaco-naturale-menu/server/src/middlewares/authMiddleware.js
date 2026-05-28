import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token nao informado.", 401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token invalido.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.admin = decoded;
    next();
  } catch {
    throw new AppError("Token expirado ou invalido.", 401);
  }
}
