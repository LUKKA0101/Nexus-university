import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";
import prisma from "../lib/prisma";

export const checkOwnership = (model: "teacher" | "student") => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role === "DIRECTOR") {
        return next();
      }

      if (model !== "teacher" && req.user?.role === "TEACHER") {
        return next();
      }

      const id = Number(req.params.id);

      const record = await (prisma[model] as any).findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!record) {
        return res.status(404).json({ err: "NOT_FOUND" });
      }

      if (record.userId !== req.user?.userId) {
        return res.status(403).json({ err: "FORBIDDEN" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
