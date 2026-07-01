import prisma from "../../lib/prisma";
import { UpdateTeacherDTO } from "./teacher.validate";
import { buildPaginatedResponse } from "../../utils/paginate";

const teacherSelect = {
  id: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      birthDate: true,
      role: true,
      createdAt: true,
    },
  },
  classDisciplines: {
    select: {
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
    },
  },
} as const;

export class TeacherService {
  // Method to list all teachers
  async listAllTeachers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [total, data] = await prisma.$transaction([
      prisma.teacher.count(),
      prisma.teacher.findMany({
        skip,
        take: limit,
        select: teacherSelect,
      }),
    ]);

    const formattedData = data.map((teacher) => ({
      ...teacher,
      user: {
        ...teacher.user,
        birthDate: teacher.user.birthDate.toISOString().split("T")[0],
        createdAt: teacher.user.createdAt.toISOString().split("T")[0],
      },
    }));

    return buildPaginatedResponse(formattedData, page, limit, total);
  }

  // Method to get a teacher by ID
  async getTeacherById(id: number) {
    const result = await prisma.teacher.findUnique({
      where: { id },
      select: teacherSelect,
    });

    if (!result) throw new Error("TEACHER_NOT_FOUND");

    return {
      teacherId: result.id,
      ...result.user,
      birthDate: result.user.birthDate.toISOString().split("T")[0],
      createdAt: result.user.createdAt.toISOString().split("T")[0],
    };
  }

  // Method to get a teacher disciplines by ID
  async getTeacherDisciplines(id: number, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const classDisciplines = await prisma.teacher.findUnique({
      where: { id },
      select: {
        user: { select: { name: true } },
        classDisciplines: {
          skip,
          take: limit,
          select: {
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
          },
        },
        _count: { select: { classDisciplines: true } },
      },
    });

    if (!classDisciplines) throw new Error("TEACHER_NOT_FOUND");

    const { _count, ...rest } = classDisciplines;

    return buildPaginatedResponse(rest, page, limit);
  }

  // Method to update a teacher by ID
  async updateTeacherById(id: number, data: UpdateTeacherDTO) {
    const exists = await prisma.teacher.findUnique({ where: { id } });
    if (!exists) throw new Error("TEACHER_NOT_FOUND");

    const userData: any = {};
    if (data.name !== undefined) userData.name = data.name;
    if (data.email !== undefined) userData.email = data.email;
    if (data.birthDate !== undefined)
      userData.birthDate = new Date(data.birthDate);

    const result = await prisma.teacher.update({
      where: { id },
      data: {
        user: { update: userData },
      },
      select: teacherSelect,
    });

    return {
      teacherId: result.id,
      ...result.user,
      birthDate: result.user.birthDate.toISOString().split("T")[0],
      createdAt: result.user.createdAt.toISOString().split("T")[0],
    };
  }

  // Method to delete a teacher by ID
  async deleteTeacherById(id: number) {
    const exists = await prisma.teacher.findUnique({ where: { id } });
    if (!exists) throw new Error("TEACHER_NOT_FOUND");

    await prisma.teacher.delete({ where: { id } });
  }
}
