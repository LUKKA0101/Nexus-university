import prisma from "../../prisma/prisma";
import { courseDTO, courseUpdateDTO } from "./course.validate";

export class CourseService {
  async createCourse(data: courseDTO) {
    const result = await prisma.course.create({ data });
    return result;
  }

  async updateCourse(id: number, data: courseUpdateDTO) {
    const result = await prisma.course.update({
      where: { id },
      data,
    });

    if (!result) {
      throw new Error("Curso não encontrado");
    }
    return result;
  }

  async deleteCourse(id: number) {
    const result = await prisma.course.delete({
      where: { id },
    });
    if (!result) {
      throw new Error("Curso não encontrado");
    }
    return result;
  }

  async getCourseById(id: number) {
    const result = await prisma.course.findUnique({
      where: { id },
    });
    if (!result) {
      throw new Error("Curso não encontrado");
    }
    return result;
  }
}
