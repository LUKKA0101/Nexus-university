import prisma from "../../lib/prisma";
import {
  CreateCourseModuleDTO,
  UpdateCourseModuleDTO,
} from "./course-module.validate";
import { buildPaginatedResponse } from "../../utils/paginate";

const courseModuleSelect = {
  id: true,
  title: true,
  discipline: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

export class CourseModuleService {
  // Method to create a course module
  async createCourseModule(data: CreateCourseModuleDTO) {
    return await prisma.courseModule.create({
      data,
      select: courseModuleSelect,
    });
  }

  // Method to list all course modules
  async listAllCourseModules(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [total, data] = await prisma.$transaction([
      prisma.courseModule.count(),
      prisma.courseModule.findMany({
        skip,
        take: limit,
        select: courseModuleSelect,
      }),
    ]);

    return buildPaginatedResponse(data, page, limit, total);
  }

  // Method to get a course module by ID
  async getCourseModuleById(id: number) {
    const result = await prisma.courseModule.findUnique({
      where: { id },
      select: courseModuleSelect,
    });

    if (!result) throw new Error("COURSE_MODULE_NOT_FOUND");

    return result;
  }

  // Method to get lessons of a course module
  async getCourseModuleLessons(id: number, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const result = await prisma.courseModule.findUnique({
      where: { id },
      select: {
        title: true,
        discipline: {
          select: {
            id: true,
            name: true,
          },
        },
        lessons: {
          skip,
          take: limit,
          select: {
            id: true,
            title: true,
            videoUrl: true,
          },
        },
        _count: {
          select: { lessons: true },
        },
      },
    });

    if (!result) throw new Error("COURSE_MODULE_NOT_FOUND");

    return {
      module: result.title,
      discipline: result.discipline,
      lessons: result.lessons,
      meta: {
        total: result._count.lessons,
        page,
        limit,
        totalPages: Math.ceil(result._count.lessons / limit),
      },
    };
  }

  // Method to update a course module by ID
  async updateCourseModuleById(id: number, data: UpdateCourseModuleDTO) {
    const exists = await prisma.courseModule.findUnique({ where: { id } });
    if (!exists) throw new Error("COURSE_MODULE_NOT_FOUND");

    return await prisma.courseModule.update({
      where: { id },
      data,
      select: courseModuleSelect,
    });
  }

  // Method to delete a course module by ID
  async deleteCourseModuleById(id: number) {
    const exists = await prisma.courseModule.findUnique({ where: { id } });
    if (!exists) throw new Error("COURSE_MODULE_NOT_FOUND");

    await prisma.courseModule.delete({ where: { id } });
  }
}
