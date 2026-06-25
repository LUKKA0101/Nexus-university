import { Request, Response, NextFunction } from "express";
import { DisciplineService } from "./discipline.service";
import {
  createDisciplineSchema,
  updateDisciplineSchema,
} from "./discipline.validate";

export class DisciplineController {
  constructor(private disciplineService: DisciplineService) {}

  // Method to create a discipline
  createDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = createDisciplineSchema.parse(req.body);
      const result = await this.disciplineService.createDiscipline(data);
      res
        .status(201)
        .json({ message: "Discipline created successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to list all disciplines
  listAllDisciplines = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.disciplineService.listAllDisciplines();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a discipline by ID
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

  // Method to get modules of a discipline
  getDisciplineModules = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.disciplineService.getDisciplineModules(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a discipline by ID
  updateDisciplineById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateDisciplineSchema.parse(req.body);
      const result = await this.disciplineService.updateDisciplineById(
        id,
        data,
      );
      res
        .status(200)
        .json({ message: "Discipline updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a discipline by ID
  deleteDisciplineById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.disciplineService.deleteDisciplineById(id);
      res.status(200).json({ message: "Discipline deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
