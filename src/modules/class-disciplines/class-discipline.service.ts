import prisma from "../../prisma/prisma";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime/client";
import {
  ClassDisciplineDTO,
  ClassDisciplineUpdateDTO,
} from "./class-discipline.validate";

export class ClassDisciplineService {
  async createClassDiscipline(data: ClassDisciplineDTO) {
    return await prisma.classDiscipline.create({ data });
  }

  async updateClassDiscipline(id: number, data: ClassDisciplineUpdateDTO) {
    try {
      return await prisma.classDiscipline.update({ where: { id }, data });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("ClassDiscipline não encontrada");
      }
      throw e;
    }
  }

  async deleteClassDiscipline(id: number) {
    try {
      return await prisma.classDiscipline.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("ClassDiscipline não encontrada");
      }
      throw e;
    }
  }

  async getClassDisciplineById(id: number) {
    const result = await prisma.classDiscipline.findUnique({
      where: { id },
      include: {
        class: true,
        discipline: true,
        teacher: true,
      },
    });
    if (!result) throw new Error("ClassDiscipline não encontrada");
    return result;
  }
}
