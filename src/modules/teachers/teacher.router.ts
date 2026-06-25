import { Router } from "express";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";
import { checkOwnership } from "../../middlewares/checkOwnership-auth.middleware";

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
  authMiddlewareRoles("DIRECTOR"),
  teacherController.updateTeacherById,
);
teacherRouter.delete(
  "/:id",
  authMiddlewareRoles("DIRECTOR"),
  teacherController.deleteTeacherById,
);

export default teacherRouter;
