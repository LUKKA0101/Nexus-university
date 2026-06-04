import prisma from "../../prisma/prisma";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime/client";
import { LessonDTO, LessonUpdateDTO } from "./lesson.validate";

export class LessonService {
  async createLesson(data: LessonDTO) {
    return await prisma.lesson.create({ data });
  }

  async updateLesson(id: number, data: LessonUpdateDTO) {
    try {
      return await prisma.lesson.update({ where: { id }, data });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Aula não encontrada");
      }
      throw e;
    }
  }

  async deleteLesson(id: number) {
    try {
      return await prisma.lesson.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Aula não encontrada");
      }
      throw e;
    }
  }

  async getLessonById(id: number) {
    const result = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: true,
      },
    });
    if (!result) throw new Error("Aula não encontrada");
    return result;
  }
}
