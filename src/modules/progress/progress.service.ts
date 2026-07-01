import prisma from "../../lib/prisma";
import { CreateProgressDTO } from "./progress.validate";

const progressSelect = {
  id: true,
  completed: true,
  watchedAt: true,
  completedAt: true,
  student: {
    select: {
      id: true,
      registration: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  },
  lesson: {
    select: {
      id: true,
      title: true,
      videoUrl: true,
    },
  },
  classDiscipline: {
    select: {
      id: true,
      discipline: {
        select: {
          id: true,
          name: true,
        },
      },
      classroom: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;

export class ProgressService {
  // Method to register a lesson watch
  async createProgress(data: CreateProgressDTO) {
    return await prisma.progress.create({
      data,
      select: progressSelect,
    });
  }

  // Method to mark a lesson as complete
  async completeProgress(id: number) {
    const exists = await prisma.progress.findUnique({ where: { id } });
    if (!exists) throw new Error("PROGRESS_NOT_FOUND");

    if (exists.completed) throw new Error("PROGRESS_ALREADY_COMPLETED");

    return await prisma.progress.update({
      where: { id },
      data: {
        completed: true,
        completedAt: new Date(),
      },
      select: progressSelect,
    });
  }

  // Method to get full progress of a student
  async getStudentProgress(studentId: number, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        registration: true,
        user: { select: { name: true, email: true } },
        _count: { select: { progress: true } },
        progress: {
          skip,
          take: limit,
          select: {},
        },
      },
    });

    if (!student) throw new Error("STUDENT_NOT_FOUND");

    const { _count, ...rest } = student;

    return {
      ...rest,
      ...student.user,
      meta: {
        total: _count.progress,
        page,
        limit,
        totalPages: Math.ceil(_count.progress / limit),
      },
    };
  }

  // Method to get progress of a class discipline
  async getClassDisciplineProgress(classDisciplineId: number) {
    const classDiscipline = await prisma.classDiscipline.findUnique({
      where: { id: classDisciplineId },
      select: {
        id: true,
        discipline: {
          select: {
            id: true,
            name: true,
          },
        },
        classroom: {
          select: {
            id: true,
            name: true,
          },
        },
        progress: {
          select: {
            id: true,
            completed: true,
            watchedAt: true,
            completedAt: true,
            student: {
              select: {
                id: true,
                registration: true,
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            lesson: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!classDiscipline) throw new Error("CLASS_DISCIPLINE_NOT_FOUND");

    return {
      classDisciplineId: classDiscipline.id,
      discipline: classDiscipline.discipline,
      classroom: classDiscipline.classroom,
      progress: classDiscipline.progress.map((p) => ({
        progressId: p.id,
        completed: p.completed,
        watchedAt: p.watchedAt,
        completedAt: p.completedAt,
        lesson: p.lesson,
        student: {
          studentId: p.student.id,
          registration: p.student.registration,
          name: p.student.user.name,
        },
      })),
    };
  }
}
