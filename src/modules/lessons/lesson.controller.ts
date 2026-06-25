import { Request, Response, NextFunction } from "express";
import { LessonService } from "./lesson.service";
import { createLessonSchema, updateLessonSchema } from "./lesson.validate";

export class LessonController {
  constructor(private lessonService: LessonService) {}

  // Method to create a lesson
  createLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createLessonSchema.parse(req.body);
      const result = await this.lessonService.createLesson(data);
      res
        .status(201)
        .json({ message: "Lesson created successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a lesson by ID
  getLessonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.lessonService.getLessonById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a lesson by ID
  updateLessonById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateLessonSchema.parse(req.body);
      const result = await this.lessonService.updateLessonById(id, data);
      res
        .status(200)
        .json({ message: "Lesson updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a lesson by ID
  deleteLessonById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.lessonService.deleteLessonById(id);
      res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
