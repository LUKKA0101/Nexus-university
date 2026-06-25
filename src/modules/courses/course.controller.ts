import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";
import { createCourseSchema, updateCourseSchema } from "./course.validate";

export class CourseController {
  constructor(private courseService: CourseService) {}

  createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createCourseSchema.parse(req.body);
      const result = await this.courseService.createCourse(data);
      res
        .status(201)
        .json({ message: "Course created successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.courseService.getCourses();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.courseService.getCourseById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  updateCourseById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      const data = updateCourseSchema.parse(req.body);
      const result = await this.courseService.updateCourseById(id, data);
      res
        .status(200)
        .json({ message: "Course updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  };

  deleteCourseById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number(req.params.id);
      await this.courseService.deleteCourseById(id);
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
