import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { checkOwnership } from "../../middlewares/checkOwnership-auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";

const teacherRouter = Router();
const teacherService = new TeacherService();
const teacherController = new TeacherController(teacherService);

teacherRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  teacherController.listAllTeachers,
);
teacherRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  checkOwnership("teacher"),
  teacherController.getTeacherById,
);
teacherRouter.get(
  "/:id/disciplines",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  checkOwnership("teacher"),
  teacherController.getTeacherDisciplines,
);
teacherRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  teacherController.updateTeacherById,
);
teacherRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  teacherController.deleteTeacherById,
);

export default teacherRouter;
