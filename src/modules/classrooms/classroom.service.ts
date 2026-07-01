import prisma from "../../lib/prisma";
import { CreateClassroomDTO, UpdateClassroomDTO } from "./classroom.validate";

const classroomSelect = {
  id: true,
  name: true,
  semester: true,
  year: true,
  course: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

export class ClassroomService {
  // Method to create a classroom
  async createClassroom(data: CreateClassroomDTO) {
    return await prisma.classroom.create({
      data,
      select: classroomSelect,
    });
  }

  // Method to list all classrooms
  async listAllClassrooms(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [total, data] = await prisma.$transaction([
      prisma.classroom.count(),
      prisma.classroom.findMany({
        skip,
        take: limit,
        select: classroomSelect,
      }),
    ]);
    return {
      data: data.map((classroom) => ({
        ...classroom,
      })),
      meta: {
        total,
      },
    };
  }

  // Method to get a classroom by ID
  async getClassroomById(id: number) {
    const result = await prisma.classroom.findUnique({
      where: { id },
      select: classroomSelect,
    });

    if (!result) throw new Error("CLASSROOM_NOT_FOUND");

    return result;
  }

  // Method to list students of a classroom
  async getClassroomStudents(id: number, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const classroom = await prisma.classroom.findUnique({
      where: { id },
      select: {
        name: true,
        course: {
          select: {
            id: true,
            name: true,
          },
        },
        students: {
          skip,
          take: limit,
          select: {
            id: true,
            registration: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                role: true,
              },
            },
          },
        },
        _count: {
          select: { students: true },
        },
      },
    });

    if (!classroom) throw new Error("CLASSROOM_NOT_FOUND");

    const { _count, ...rest } = classroom;

    return {
      ...rest,
      meta: {
        total: _count.students,
        page,
        limit,
        totalPages: Math.ceil(_count.students / limit),
      },
    };
  }

  // Method to list disciplines of a classroom
  async getClassroomDisciplines(id: number) {
    const result = await prisma.classroom.findUnique({
      where: { id },
      select: {
        name: true,
        classDisciplines: {
          select: {
            id: true,
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
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) throw new Error("CLASSROOM_NOT_FOUND");

    return {
      classroom: result.name,
      disciplines: result.classDisciplines.map((cd) => ({
        classDisciplineId: cd.id,
        discipline: cd.discipline,
        teacher: {
          teacherId: cd.teacher.id,
          name: cd.teacher.user.name,
        },
      })),
    };
  }

  // Method to update a classroom by ID
  async updateClassroomById(id: number, data: UpdateClassroomDTO) {
    const exists = await prisma.classroom.findUnique({ where: { id } });
    if (!exists) throw new Error("CLASSROOM_NOT_FOUND");

    return await prisma.classroom.update({
      where: { id },
      data,
      select: classroomSelect,
    });
  }

  // Method to delete a classroom by ID
  async deleteClassroomById(id: number) {
    const exists = await prisma.classroom.findUnique({ where: { id } });
    if (!exists) throw new Error("CLASSROOM_NOT_FOUND");

    await prisma.classroom.delete({ where: { id } });
  }
}
