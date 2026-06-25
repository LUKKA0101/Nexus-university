import { meta } from "zod/v4/core";
import prisma from "../../lib/prisma";
import { UpdateStudentDTO } from "./student.validate";
const studentSelect = {
  id: true,
  registration: true,
  classroom: true,
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
};

export class StudentService {
  // Method to list all students
  async listAllStudents(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [total, data] = await prisma.$transaction([
      prisma.student.count(),

      prisma.student.findMany({
        skip,
        take: limit,
        select: studentSelect,
      }),
    ]);

    return {
      data: data.map((student) => ({
        ...student,
        user: {
          ...student.user,
          birthDate: student.user.birthDate.toISOString().split("T")[0],
          createdAt: student.user.createdAt.toISOString().split("T")[0],
        },
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(limit / page),
      },
    };
  }

  // Method to get a student by ID
  async getStudentById(id: number) {
    const result = await prisma.student.findUnique({
      where: { id },
      select: studentSelect,
    });
    if (!result) throw new Error("STUDENT_NOT_FOUND");
    return {
      studentId: result.id,
      ...result.user,
      registration: result.registration,
      classroom: result.classroom,
      birthDate: result.user.birthDate.toISOString().split("T")[0],
      createdAt: result.user.createdAt.toISOString().split("T")[0],
    };
  }

  // Method to get a student progress by ID
  async getStudentProgress(id: number) {
    const result = await prisma.student.findUnique({
      where: { id },
      select: {
        user: { select: { name: true } },
        registration: studentSelect.registration,
        progress: {
          select: {
            completed: true,
            watchedAt: true,
            completedAt: true,
            lesson: { select: { title: true } },
            classDiscipline: {
              select: {
                discipline: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    if (!result) throw new Error("STUDENT_NOT_FOUND");
    return {
      user: {
        ...result.user,
        registration: studentSelect.registration,
      },
      progress: result.progress,
    };
  }

  // Method to update a student by ID
  async updateStudentById(id: number, data: UpdateStudentDTO) {
    const result = await prisma.student.update({
      where: { id },
      data: {
        registration: data.registration,
        classroomId: data.classroomId,
      },
      select: studentSelect,
    });
    return {
      studentId: result.id,
      ...result.user,
      registration: result.registration,
      classroom: result.classroom,
      birthDate: result.user.birthDate.toISOString().split("T")[0],
      createdAt: result.user.createdAt.toISOString().split("T")[0],
    };
  }

  // Method to delete a student by ID
  async deleteStudentById(id: number) {
    await prisma.student.delete({ where: { id } });
  }
}
