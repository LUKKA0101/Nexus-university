import prisma from "../../lib/prisma";
import {
  CreateDisciplineDTO,
  UpdateDisciplineDTO,
} from "./discipline.validate";

const disciplineSelect = {
  id: true,
  name: true,
  courseModules: {
    select: {
      id: true,
      title: true,
      lessons: {
        select: {
          id: true,
          title: true,
          videoUrl: true,
        },
      },
    },
  },
} as const;

export class DisciplineService {
  // Method to create a discipline
  async createDiscipline(data: CreateDisciplineDTO) {
    return await prisma.discipline.create({
      data,
      select: disciplineSelect,
    });
  }

  // Method to list all disciplines
  async listAllDisciplines() {
    return await prisma.discipline.findMany({
      select: disciplineSelect,
    });
  }

  // Method to get a discipline by ID
  async getDisciplineById(id: number) {
    const result = await prisma.discipline.findUnique({
      where: { id },
      select: disciplineSelect,
    });

    if (!result) throw new Error("DISCIPLINE_NOT_FOUND");

    return result;
  }

  // Method to get modules of a discipline
  async getDisciplineModules(id: number) {
    const result = await prisma.discipline.findUnique({
      where: { id },
      select: {
        name: true,
        courseModules: {
          select: {
            id: true,
            title: true,
            lessons: {
              select: {
                id: true,
                title: true,
                videoUrl: true,
              },
            },
          },
        },
      },
    });

    if (!result) throw new Error("DISCIPLINE_NOT_FOUND");

    return {
      discipline: result.name,
      modules: result.courseModules,
    };
  }

  // Method to update a discipline by ID
  async updateDisciplineById(id: number, data: UpdateDisciplineDTO) {
    const exists = await prisma.discipline.findUnique({ where: { id } });
    if (!exists) throw new Error("DISCIPLINE_NOT_FOUND");

    return await prisma.discipline.update({
      where: { id },
      data,
      select: disciplineSelect,
    });
  }

  // Method to delete a discipline by ID
  async deleteDisciplineById(id: number) {
    const exists = await prisma.discipline.findUnique({ where: { id } });
    if (!exists) throw new Error("DISCIPLINE_NOT_FOUND");

    await prisma.discipline.delete({ where: { id } });
  }
}
