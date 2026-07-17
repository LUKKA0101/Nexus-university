import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";
import prisma from "../lib/prisma";

export const checkOwnership = (
  model: "teacher" | "student",
  paramName: string = "id",
) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role === "DIRECTOR") {
        return next();
      }

      if (model !== "teacher" && req.user?.role === "TEACHER") {
        return next();
      }

      const id = Number(req.params[paramName]);

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

export const checkOwnershipStudentFromBody = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const studentId = Number(req.body.studentId);

      const student = await prisma.student.findUnique({
        where: { id: studentId },
        select: { userId: true },
      });

      if (!student) return res.status(404).json({ err: "STUDENT_NOT_FOUND" });
      if (student.userId !== req.user?.userId) {
        return res.status(403).json({ err: "FORBIDDEN" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const checkOwnershipProgress = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const progress = await prisma.progress.findUnique({
        where: { id },
        select: { student: { select: { userId: true } } },
      });

      if (!progress) return res.status(404).json({ err: "NOT_FOUND" });
      if (progress.student.userId !== req.user?.userId) {
        return res.status(403).json({ err: "FORBIDDEN" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
