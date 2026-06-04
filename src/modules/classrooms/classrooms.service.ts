import prisma from "../../prisma/prisma";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime/client";
import { ClassDTO, ClassUpdateDTO } from "./classrooms.validate";

/** Service responsible for managing classrooms. */
export class ClassroomService {
  /** POST */

  /** Creates a new classroom. */
  async createClass(data: ClassDTO) {
    const result = await prisma.classroom.create({ data });
    return result;
  }

  /* GET */

  async getAllClass() {
    const result = await prisma.classroom.findMany();
    return result;
  }

  /** Returns a classroom with its course name. Throws if not found. */
  async getClassById(id: number) {
    const result = await prisma.classroom.findUnique({
      where: { id },
      select: {
        name: true,
        semester: true,
        year: true,
        course: {
          select: { name: true }, // only the course name is needed
        },
      },
    });

    if (!result) {
      throw new Error("Turma não encontrada");
    }

    return result;
  }

  async getStudentsByClassroom(classroom: number) {
    const result = await prisma.student.findMany({
      where: { id: classroom },
      select: {
        registration: true,
        classroom: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            age: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    return result;
  }

  /* PUT */

  /** Updates a classroom by ID. Throws if not found. */
  async updateClass(id: number, data: ClassUpdateDTO) {
    try {
      return await prisma.classroom.update({ where: { id }, data });
    } catch (e) {
      // P2025 = record not found
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Turma não encontrada");
      }
      throw e;
    }
  }

  /** Deletes a classroom by ID. Throws if not found. */
  async deleteClass(id: number) {
    try {
      return await prisma.classroom.delete({ where: { id } });
    } catch (e) {
      // P2025 = record not found
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new Error("Turma não encontrada");
      }
      throw e;
    }
  }
}
