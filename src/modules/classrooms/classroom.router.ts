import { Router } from "express";
import { ClassroomService } from "./classroom.service";
import { ClassroomController } from "./classroom.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";
import { checkOwnership } from "../../middlewares/checkOwnership-auth.middleware";

const classroomRouter = Router();
const classroomService = new ClassroomService();
const classroomController = new ClassroomController(classroomService);

classroomRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  classroomController.createClassroom,
);
classroomRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  classroomController.listAllClassrooms,
);
classroomRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  classroomController.getClassroomById,
);
classroomRouter.get(
  "/:id/students",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  classroomController.getClassroomStudents,
);
classroomRouter.get(
  "/:id/disciplines",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  classroomController.getClassroomDisciplines,
);
classroomRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  classroomController.updateClassroomById,
);
classroomRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  classroomController.deleteClassroomById,
);

export default classroomRouter;
