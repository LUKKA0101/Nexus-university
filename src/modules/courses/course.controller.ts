import { NextFunction, Request, Response } from "express";
import { courseSchema, courseSchemaUpdate } from "./course.validate";
import { CourseService } from "./course.service";

export class CourseController {
  constructor(private courseService: CourseService) {}

  createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = courseSchema.parse(req.body);
      const result = await this.courseService.createCourse(data);

      res.status(201).json({
        message: "curso criado",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = courseSchemaUpdate.parse(req.body);
      const result = await this.courseService.updateCourse(id, data);
      res.status(200).json({
        message: "Atualizado com sucesso",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = this.courseService.deleteCourse(id);
      res.status(200).json({
        message: "Curso deletado",
      });
    } catch (error) {
      next(error);
    }
  };

  getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = this.courseService.getCourseById(id);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
