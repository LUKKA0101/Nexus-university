import { Router } from "express";
import { CourseModuleService } from "./course-module.service";
import { CourseModuleController } from "./course-module.controller";

const courseModuleRouter = Router();
const courseModuleService = new CourseModuleService();
const courseModuleController = new CourseModuleController(courseModuleService);

courseModuleRouter.post("/", courseModuleController.createCourseModule);
courseModuleRouter.get("/", courseModuleController.listAllCourseModules);
courseModuleRouter.get("/:id", courseModuleController.getCourseModuleById);
courseModuleRouter.get(
  "/:id/lessons",
  courseModuleController.getCourseModuleLessons,
);
courseModuleRouter.put("/:id", courseModuleController.updateCourseModuleById);
courseModuleRouter.delete(
  "/:id",
  courseModuleController.deleteCourseModuleById,
);

export default courseModuleRouter;
