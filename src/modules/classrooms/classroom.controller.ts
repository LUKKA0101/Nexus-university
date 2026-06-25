import { Request, Response, NextFunction } from "express";
import { ClassroomService } from "./classroom.service";
import {
  createClassroomSchema,
  updateClassroomSchema,
} from "./classroom.validate";

export class ClassroomController {
  constructor(private classroomService: ClassroomService) {}

  // Method to create a classroom
  createClassroom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createClassroomSchema.parse(req.body);
      const result = await this.classroomService.createClassroom(data);
      res
        .status(201)
        .json({ message: "Classroom created successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to list all classrooms
  listAllClassrooms = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.classroomService.listAllClassrooms();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a classroom by ID
  getClassroomById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.classroomService.getClassroomById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get students of a classroom
  getClassroomStudents = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.classroomService.getClassroomStudents(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get disciplines of a classroom
  getClassroomDisciplines = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.classroomService.getClassroomDisciplines(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a classroom by ID
  updateClassroomById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateClassroomSchema.parse(req.body);
      const result = await this.classroomService.updateClassroomById(id, data);
      res
        .status(200)
        .json({ message: "Classroom updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a classroom by ID
  deleteClassroomById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.classroomService.deleteClassroomById(id);
      res.status(200).json({ message: "Classroom deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
