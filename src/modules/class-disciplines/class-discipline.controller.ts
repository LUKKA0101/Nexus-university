import { Request, Response, NextFunction } from "express";
import { ClassDisciplineService } from "./class-discipline.service";
import {
  createClassDisciplineSchema,
  updateClassDisciplineSchema,
} from "./class-discipline.validate";

export class ClassDisciplineController {
  constructor(private classDisciplineService: ClassDisciplineService) {}

  // Method to create a class discipline
  createClassDiscipline = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = createClassDisciplineSchema.parse(req.body);
      const result =
        await this.classDisciplineService.createClassDiscipline(data);
      res.status(201).json({
        message: "Class discipline created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Method to list all class disciplines
  listAllClassDisciplines = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result =
        await this.classDisciplineService.listAllClassDisciplines();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a class discipline by ID
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

  // Method to update a class discipline by ID
  updateClassDisciplineById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateClassDisciplineSchema.parse(req.body);
      const result =
        await this.classDisciplineService.updateClassDisciplineById(id, data);
      res.status(200).json({
        message: "Class discipline updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a class discipline by ID
  deleteClassDisciplineById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.classDisciplineService.deleteClassDisciplineById(id);
      res
        .status(200)
        .json({ message: "Class discipline deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
