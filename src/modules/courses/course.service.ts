import prisma from "../../lib/prisma";
import { CreateCourseDTO, UpdateCourseDTO } from "./course.validate";
import { buildPaginatedResponse } from "../../utils/paginate";

const courseSelect = {
  id: true,
  name: true,
  classrooms: {
    select: {
      id: true,
      name: true,
      semester: true,
      year: true,
    },
  },
} as const;

export class CourseService {
  async createCourse(data: CreateCourseDTO) {
    return await prisma.course.create({
      data,
      select: courseSelect,
    });
  }

  async getCourses(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [total, data] = await prisma.$transaction([
      prisma.course.count(),

      prisma.course.findMany({
        skip,
        take: limit,
        select: courseSelect,
      }),
    ]);
    return {
      data: data.map((course) => ({
        ...course,
      })),
      buildPaginatedResponse,
    };
  }

  async getCourseById(id: number) {
    const result = await prisma.course.findUnique({
      where: { id },
      select: courseSelect,
    });

    if (!result) throw new Error("COURSE_NOT_FOUND");

    return result;
  }

  async updateCourseById(id: number, data: UpdateCourseDTO) {
    const exists = await prisma.course.findUnique({ where: { id } });
    if (!exists) throw new Error("COURSE_NOT_FOUND");

    return await prisma.course.update({
      where: { id },
      data,
      select: courseSelect,
    });
  }

  async deleteCourseById(id: number) {
    const exists = await prisma.course.findUnique({ where: { id } });
    if (!exists) throw new Error("COURSE_NOT_FOUND");

    await prisma.course.delete({ where: { id } });
  }
}
