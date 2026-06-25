import prisma from "../../lib/prisma";
import {
  CreateClassDisciplineDTO,
  UpdateClassDisciplineDTO,
} from "./class-discipline.validate";

const classDisciplineSelect = {
  id: true,
  classroom: {
    select: {
      id: true,
      name: true,
      semester: true,
      year: true,
    },
  },
  discipline: {
    select: {
      id: true,
      name: true,
    },
  },
  teacher: {
    select: {
      id: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  },
} as const;

export class ClassDisciplineService {
  // Method to create a class discipline
  async createClassDiscipline(data: CreateClassDisciplineDTO) {
    return await prisma.classDiscipline.create({
      data,
      select: classDisciplineSelect,
    });
  }

  // Method to list all class disciplines
  async listAllClassDisciplines() {
    return await prisma.classDiscipline.findMany({
      select: classDisciplineSelect,
    });
  }

  // Method to get a class discipline by ID
  async getClassDisciplineById(id: number) {
    const result = await prisma.classDiscipline.findUnique({
      where: { id },
      select: classDisciplineSelect,
    });

    if (!result) throw new Error("CLASS_DISCIPLINE_NOT_FOUND");

    return result;
  }

  // Method to update a class discipline by ID
  async updateClassDisciplineById(id: number, data: UpdateClassDisciplineDTO) {
    const exists = await prisma.classDiscipline.findUnique({ where: { id } });
    if (!exists) throw new Error("CLASS_DISCIPLINE_NOT_FOUND");

    return await prisma.classDiscipline.update({
      where: { id },
      data,
      select: classDisciplineSelect,
    });
  }

  // Method to delete a class discipline by ID
  async deleteClassDisciplineById(id: number) {
    const exists = await prisma.classDiscipline.findUnique({ where: { id } });
    if (!exists) throw new Error("CLASS_DISCIPLINE_NOT_FOUND");

    await prisma.classDiscipline.delete({ where: { id } });
  }
}
