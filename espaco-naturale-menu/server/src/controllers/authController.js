import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export function login(request, response) {
  const { password } = request.body;

  if (!password) {
    throw new AppError("Senha obrigatoria.");
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    throw new AppError("Senha incorreta.", 401);
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "8h"
  });

  return response.json({ token });
}

export function me(request, response) {
  return response.json({
    admin: {
      role: request.admin.role
    }
  });
}
