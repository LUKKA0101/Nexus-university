import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest, payloadSchema } from "../types/auth.types";

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("TOKEN_MISSING");
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY!);
    const payload = payloadSchema.parse(decode);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}
