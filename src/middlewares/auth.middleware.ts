import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest, payloadSchema } from "../types/auth.types";

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY!);
    const payload = payloadSchema.parse(decode);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}
