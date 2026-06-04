import { Request, Response, NextFunction } from "express";
import { CourseModuleService } from "./course-module.service";
import {
  courseModuleSchema,
  courseModuleUpdateSchema,
} from "./course-module.validate";

export class CourseModuleController {
  constructor(private courseModuleService: CourseModuleService) {}

  createModule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = courseModuleSchema.parse(req.body);
      const result = await this.courseModuleService.createModule(data);
      res.status(201).json({ message: "Módulo criado", data: result });
    } catch (error) {
      next(error);
    }
  };

  updateModule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = courseModuleUpdateSchema.parse(req.body);
      const result = await this.courseModuleService.updateModule(id, data);
      res.status(200).json({ message: "Módulo atualizado", data: result });
    } catch (error) {
      next(error);
    }
  };

  deleteModule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.courseModuleService.deleteModule(id);
      res.status(200).json({ message: "Módulo deletado" });
    } catch (error) {
      next(error);
    }
  };

  getModuleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.courseModuleService.getModuleById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}
