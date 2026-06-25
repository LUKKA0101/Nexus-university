import { Router } from "express";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";

const courseRouter = Router();
const courseService = new CourseService();
const courseController = new CourseController(courseService);

courseRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  courseController.createCourse,
);

courseRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  courseController.getCourses,
);

courseRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  courseController.getCourseById,
);

courseRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  courseController.updateCourseById,
);

courseRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  courseController.deleteCourseById,
);

export default courseRouter;
