import { Router } from "express";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";

const lessonRouter = Router();
const lessonService = new LessonService();
const lessonController = new LessonController(lessonService);

lessonRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  lessonController.createLesson,
);
lessonRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  lessonController.getLessonById,
);
lessonRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  lessonController.updateLessonById,
);
lessonRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  lessonController.deleteLessonById,
);

export default lessonRouter;
