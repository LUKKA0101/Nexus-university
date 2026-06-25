import prisma from "../../lib/prisma";
import { CreateLessonDTO, UpdateLessonDTO } from "./lesson.validate";

const lessonSelect = {
  id: true,
  title: true,
  videoUrl: true,
  module: {
    select: {
      id: true,
      title: true,
      discipline: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;

export class LessonService {
  // Method to create a lesson
  async createLesson(data: CreateLessonDTO) {
    return await prisma.lesson.create({
      data,
      select: lessonSelect,
    });
  }

  // Method to get a lesson by ID
  async getLessonById(id: number) {
    const result = await prisma.lesson.findUnique({
      where: { id },
      select: lessonSelect,
    });

    if (!result) throw new Error("LESSON_NOT_FOUND");

    return result;
  }

  // Method to update a lesson by ID
  async updateLessonById(id: number, data: UpdateLessonDTO) {
    const exists = await prisma.lesson.findUnique({ where: { id } });
    if (!exists) throw new Error("LESSON_NOT_FOUND");

    return await prisma.lesson.update({
      where: { id },
      data,
      select: lessonSelect,
    });
  }

  // Method to delete a lesson by ID
  async deleteLessonById(id: number) {
    const exists = await prisma.lesson.findUnique({ where: { id } });
    if (!exists) throw new Error("LESSON_NOT_FOUND");

    await prisma.lesson.delete({ where: { id } });
  }
}
