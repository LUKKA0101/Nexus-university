import prisma from "../../prisma/prisma";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime/client";
import { DisciplineDTO, DisciplineUpdateDTO } from "./discipline.validate";

export class DisciplineService {
  async createDiscipline(data: DisciplineDTO) {
    return await prisma.discipline.create({ data });
  }

  async updateDiscipline(id: number, data: DisciplineUpdateDTO) {
    try {
      return await prisma.discipline.update({ where: { id }, data });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Disciplina não encontrada");
      }
      throw e;
    }
  }

  async deleteDiscipline(id: number) {
    try {
      return await prisma.discipline.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Disciplina não encontrada");
      }
      throw e;
    }
  }

  async getDisciplineById(id: number) {
    const result = await prisma.discipline.findUnique({
      where: { id },
      include: {
        courseModules: true,
      },
    });
    if (!result) throw new Error("Disciplina não encontrada");
    return result;
  }
}
