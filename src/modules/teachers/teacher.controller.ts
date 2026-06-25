import { Request, Response, NextFunction } from "express";
import { TeacherService } from "./teacher.service";
import { updateTeacherSchema } from "./teacher.validate";
import { AuthRequest } from "../../types/auth.types";

export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  // Method to list all teachers
  listAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.params.page as string) || 1;
      const limit = parseInt(req.params.limit as string) || 10;
      const result = await this.teacherService.listAllTeachers(page, limit);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a teacher by ID
  getTeacherById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.teacherService.getTeacherById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a teacher disciplines by ID
  getTeacherDisciplines = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.teacherService.getTeacherDisciplines(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a teacher by ID
  updateTeacherById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateTeacherSchema.parse(req.body);
      const result = await this.teacherService.updateTeacherById(id, data);
      res
        .status(200)
        .json({ message: "Teacher updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a teacher by ID
  deleteTeacherById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.teacherService.deleteTeacherById(id);
      res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
