import { Response } from "express";

import prisma from "../../lib/prisma";
import { AuthRequest } from "../../types/auth.types";

export async function rolesById(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  const teacher = await prisma.teacher.findUnique({ where: { id } });
  if (teacher?.userId !== req.user?.userId) {
    return res.status(403).json({ err: "Esse e um texto teste" });
  }
}
