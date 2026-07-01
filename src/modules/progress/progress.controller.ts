import { Request, Response, NextFunction } from "express";
import { ProgressService } from "./progress.service";
import { createProgressSchema } from "./progress.validate";

export class ProgressController {
  constructor(private progressService: ProgressService) {}

  // Method to register a lesson watch
  createProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createProgressSchema.parse(req.body);
      const result = await this.progressService.createProgress(data);
      res
        .status(201)
        .json({ message: "Progress registered successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to mark a lesson as complete
  completeProgress = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.progressService.completeProgress(id);
      res
        .status(200)
        .json({ message: "Lesson marked as completed", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get full progress of a student
  getStudentProgress = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const studentId = Number(req.params.studentId);
      const result = await this.progressService.getStudentProgress(
        studentId,
        page,
        limit,
      );
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get progress of a class discipline
  getClassDisciplineProgress = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.progressService.getClassDisciplineProgress(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}
