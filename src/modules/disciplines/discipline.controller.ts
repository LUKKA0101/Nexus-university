// discipline.controller.ts
import { Request, Response, NextFunction } from "express";
import { DisciplineService } from "./discipline.service";
import {
  disciplineSchema,
  disciplineSchemaUpdate,
} from "./discipline.validate";

export class DisciplineController {
  constructor(private disciplineService: DisciplineService) {}

  createDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = disciplineSchema.parse(req.body);
      const result = await this.disciplineService.createDiscipline(data);
      res.status(201).json({ message: "Disciplina criada", data: result });
    } catch (error) {
      next(error);
    }
  };

  updateDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = disciplineSchemaUpdate.parse(req.body);
      const result = await this.disciplineService.updateDiscipline(id, data);
      res.status(200).json({ message: "Disciplina atualizada", data: result });
    } catch (error) {
      next(error);
    }
  };

  deleteDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.disciplineService.deleteDiscipline(id);
      res.status(200).json({ message: "Disciplina deletada" });
    } catch (error) {
      next(error);
    }
  };

  getDisciplineById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.disciplineService.getDisciplineById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}
