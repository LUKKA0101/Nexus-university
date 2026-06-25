import { Request, Response, NextFunction } from "express";
import { StudentService } from "./student.service";
import { updateStudentSchema } from "./student.validate";

export class StudentController {
  constructor(private studentService: StudentService) {}

  // Method to list all students
  listAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.studentService.listAllStudents(page, limit);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a student by ID
  getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.studentService.getStudentById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a student progress by ID
  getStudentProgress = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.studentService.getStudentProgress(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a student by ID
  updateStudentById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateStudentSchema.parse(req.body);
      const result = await this.studentService.updateStudentById(id, data);
      res
        .status(200)
        .json({ message: "Student updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a student by ID
  deleteStudentById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.studentService.deleteStudentById(id);
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
