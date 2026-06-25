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
  async listAllClassrooms() {
    return await prisma.classroom.findMany({
      select: classroomSelect,
    });
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
  async getClassroomStudents(id: number) {
    const result = await prisma.classroom.findUnique({
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
      },
    });

    if (!result) throw new Error("CLASSROOM_NOT_FOUND");

    return {
      classroom: result.name,
      courseId: result.course?.id,
      course: result.course?.name,
      students: result.students.map((student) => ({
        studentId: student.id,
        registration: student.registration,
        ...student.user,
        birthDate: student.user.birthDate.toISOString().split("T")[0],
      })),
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
