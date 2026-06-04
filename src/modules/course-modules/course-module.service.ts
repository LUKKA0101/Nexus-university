// module.service.ts
import prisma from "../../prisma/prisma";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime/client";
import { ModuleDTO, ModuleUpdateDTO } from "./course-module.validate";

export class CourseModuleService {
  async createModule(data: ModuleDTO) {
    return await prisma.courseModule.create({ data });
  }

  async updateModule(id: number, data: ModuleUpdateDTO) {
    try {
      return await prisma.courseModule.update({ where: { id }, data });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Módulo não encontrado");
      }
      throw e;
    }
  }

  async deleteModule(id: number) {
    try {
      return await prisma.courseModule.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Módulo não encontrado");
      }
      throw e;
    }
  }

  async getModuleById(id: number) {
    const result = await prisma.courseModule.findUnique({
      where: { id },
      include: {
        lessons: true,
      },
    });
    if (!result) throw new Error("Módulo não encontrado");
    return result;
  }
}
