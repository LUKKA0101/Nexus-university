import { Request, Response, NextFunction } from "express";
import { LessonService } from "./lesson.service";
import { lessonSchema, lessonUpdateSchema } from "./lesson.validate";

export class LessonController {
  constructor(private lessonService: LessonService) {}

  createLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = lessonSchema.parse(req.body);
      const result = await this.lessonService.createLesson(data);
      res.status(201).json({ message: "Aula criada", data: result });
    } catch (error) {
      next(error);
    }
  };

  updateLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = lessonUpdateSchema.parse(req.body);
      const result = await this.lessonService.updateLesson(id, data);
      res.status(200).json({ message: "Aula atualizada", data: result });
    } catch (error) {
      next(error);
    }
  };

  deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.lessonService.deleteLesson(id);
      res.status(200).json({ message: "Aula deletada" });
    } catch (error) {
      next(error);
    }
  };

  getLessonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.lessonService.getLessonById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}
