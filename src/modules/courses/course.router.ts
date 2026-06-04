import { Router } from "express";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";

export const courseRouter = Router();
const courseService = new CourseService();
const courseController = new CourseController(courseService);

courseRouter.post("/", courseController.createCourse);
courseRouter.put("/:id", courseController.updateCourse);
courseRouter.delete("/:id", courseController.deleteCourse);
courseRouter.get("/:id", courseController.getCourseById);
