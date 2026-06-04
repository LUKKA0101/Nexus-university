import prisma from "../../prisma/prisma";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime/client";
import { ProgressDTO } from "./progress.validate";

export class ProgressService {
  async createProgress(data: ProgressDTO) {
    return await prisma.progress.create({ data });
  }

  async deleteProgress(id: number) {
    try {
      return await prisma.progress.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Progresso não encontrado");
      }
      throw e;
    }
  }

  async getProgressByStudent(studentId: number) {
    const result = await prisma.progress.findMany({
      where: { studentId },
      include: {
        lesson: true,
        classDiscipline: true,
      },
    });
    return result;
  }
}
