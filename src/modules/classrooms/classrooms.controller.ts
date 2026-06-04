import { Response, Request, NextFunction } from "express";
import { ClassroomService } from "./classrooms.service";
import { classroomSchema, classroomUpdateSchema } from "./classrooms.validate";
import { id } from "zod/locales";
import { number } from "zod";

export class CollegeClassController {
  constructor(private classroomService: ClassroomService) {}

  createClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = classroomSchema.parse(req.body);
      const result = await this.classroomService.createClass(data);

      res.status(201).json({
        message: "Classe criada",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /* GET */

  getAllClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.classroomService.getAllClass();
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getStudentsByClassroom = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.classroomService.getStudentsByClassroom(id);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /* PUT */

  updateClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = classroomUpdateSchema.parse(req.body);
      const result = await this.classroomService.updateClass(id, data);

      res.status(200).json({
        message: "Classe atualizada",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.classroomService.deleteClass(id);
      res.status(200).json({
        message: "Curso deletado",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.classroomService.getClassById(id);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
