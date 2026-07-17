import prisma from "../../lib/prisma";
import {
  CreateDisciplineDTO,
  UpdateDisciplineDTO,
} from "./discipline.validate";
import { buildPaginatedResponse } from "../../utils/paginate";

const disciplineSelect = {
  id: true,
  name: true,
  _count: {
    select: { courseModules: true },
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
  async listAllDisciplines(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [total, data] = await prisma.$transaction([
      prisma.discipline.count(),
      prisma.discipline.findMany({
        skip,
        take: limit,
        select: disciplineSelect,
      }),
    ]);

    return buildPaginatedResponse(data, page, limit, total);
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
  async getDisciplineModules(id: number, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const result = await prisma.discipline.findUnique({
      where: { id },
      select: {
        name: true,
        courseModules: {
          skip,
          take: limit,
          select: {
            id: true,
            title: true,
            _count: {
              select: { lessons: true },
            },
          },
        },
        _count: {
          select: { courseModules: true },
        },
      },
    });

    if (!result) throw new Error("DISCIPLINE_NOT_FOUND");

    return {
      discipline: result.name,
      modules: result.courseModules.map((m) => ({
        id: m.id,
        title: m.title,
        lessonsCount: m._count.lessons,
      })),
      meta: {
        total: result._count.courseModules,
        page,
        limit,
        totalPages: Math.ceil(result._count.courseModules / limit),
      },
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
