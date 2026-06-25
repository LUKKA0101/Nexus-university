import { Request, Response, NextFunction } from "express";
import { CourseModuleService } from "./course-module.service";
import {
  createCourseModuleSchema,
  updateCourseModuleSchema,
} from "./course-module.validate";

export class CourseModuleController {
  constructor(private courseModuleService: CourseModuleService) {}

  // Method to create a course module
  createCourseModule = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = createCourseModuleSchema.parse(req.body);
      const result = await this.courseModuleService.createCourseModule(data);
      res
        .status(201)
        .json({ message: "Course module created successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to list all course modules
  listAllCourseModules = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.courseModuleService.listAllCourseModules();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a course module by ID
  getCourseModuleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.courseModuleService.getCourseModuleById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to get lessons of a course module
  getCourseModuleLessons = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.courseModuleService.getCourseModuleLessons(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a course module by ID
  updateCourseModuleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateCourseModuleSchema.parse(req.body);
      const result = await this.courseModuleService.updateCourseModuleById(
        id,
        data,
      );
      res
        .status(200)
        .json({ message: "Course module updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a course module by ID
  deleteCourseModuleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.courseModuleService.deleteCourseModuleById(id);
      res.status(200).json({ message: "Course module deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
