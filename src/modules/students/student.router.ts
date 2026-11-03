import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { checkOwnership } from "../../middlewares/checkOwnership-auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";

const studentRouter = Router();

const studentService = new StudentService();
const studentController = new StudentController(studentService);

studentRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  studentController.listAllStudents,
);
studentRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  checkOwnership("student"),
  studentController.getStudentById,
);
studentRouter.get(
  "/:id/progress",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  checkOwnership("student"),
  studentController.getStudentProgress,
);
studentRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  studentController.updateStudentById,
);
studentRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  studentController.deleteStudentById,
);

export default studentRouter;
