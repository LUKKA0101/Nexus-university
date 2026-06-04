import { Request, Response, NextFunction } from "express";
import { ProgressService } from "./progress.service";
import { progressSchema } from "./progress.validate";

export class ProgressController {
  constructor(private progressService: ProgressService) {}

  createProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = progressSchema.parse(req.body);
      const result = await this.progressService.createProgress(data);
      res.status(201).json({ message: "Progresso registrado", data: result });
    } catch (error) {
      next(error);
    }
  };

  deleteProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.progressService.deleteProgress(id);
      res.status(200).json({ message: "Progresso deletado" });
    } catch (error) {
      next(error);
    }
  };

  getProgressByStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const studentId = Number(req.params.studentId);
      const result = await this.progressService.getProgressByStudent(studentId);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}
