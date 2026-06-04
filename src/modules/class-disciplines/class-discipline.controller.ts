// class-discipline.controller.ts
import { Request, Response, NextFunction } from "express";
import { ClassDisciplineService } from "./class-discipline.service";
import {
  classDisciplineSchema,
  classDisciplineSchemaUpdate,
} from "./class-discipline.validate";

export class ClassDisciplineController {
  constructor(private classDisciplineService: ClassDisciplineService) {}

  createClassDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = classDisciplineSchema.parse(req.body);
      const result =
        await this.classDisciplineService.createClassDiscipline(data);
      res.status(201).json({ message: "ClassDiscipline criada", data: result });
    } catch (error) {
      next(error);
    }
  };

  updateClassDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = classDisciplineSchemaUpdate.parse(req.body);
      const result = await this.classDisciplineService.updateClassDiscipline(
        id,
        data,
      );
      res
        .status(200)
        .json({ message: "ClassDiscipline atualizada", data: result });
    } catch (error) {
      next(error);
    }
  };

  deleteClassDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.classDisciplineService.deleteClassDiscipline(id);
      res.status(200).json({ message: "ClassDiscipline deletada" });
    } catch (error) {
      next(error);
    }
  };

  getClassDisciplineById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result =
        await this.classDisciplineService.getClassDisciplineById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}
