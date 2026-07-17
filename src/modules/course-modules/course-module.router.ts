import { Router } from "express";
import { CourseModuleService } from "./course-module.service";
import { CourseModuleController } from "./course-module.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";

const courseModuleRouter = Router();
const courseModuleService = new CourseModuleService();
const courseModuleController = new CourseModuleController(courseModuleService);

courseModuleRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  courseModuleController.createCourseModule,
);

courseModuleRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  courseModuleController.listAllCourseModules,
);

courseModuleRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  courseModuleController.getCourseModuleById,
);

courseModuleRouter.get(
  "/:id/lessons",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  courseModuleController.getCourseModuleLessons,
);
courseModuleRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  courseModuleController.updateCourseModuleById,
);

courseModuleRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  courseModuleController.deleteCourseModuleById,
);

export default courseModuleRouter;
