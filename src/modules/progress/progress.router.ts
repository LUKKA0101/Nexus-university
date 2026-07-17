import { Router } from "express";
import { ProgressService } from "./progress.service";
import { ProgressController } from "./progress.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";
import {
  checkOwnership,
  checkOwnershipProgress,
  checkOwnershipStudentFromBody,
} from "../../middlewares/checkOwnership-auth.middleware";

const progressRouter = Router();
const progressService = new ProgressService();
const progressController = new ProgressController(progressService);

progressRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRoles("STUDENT"),
  checkOwnershipStudentFromBody(),
  progressController.createProgress,
);

progressRouter.patch(
  "/:id/complete",
  authMiddleware,
  authMiddlewareRoles("STUDENT"),
  checkOwnershipProgress(),
  progressController.completeProgress,
);

progressRouter.get(
  "/student/:studentId",
  authMiddleware,
  authMiddlewareRoles("STUDENT", "TEACHER", "DIRECTOR"),
  checkOwnership("student", "studentId"),
  progressController.getStudentProgress,
);

progressRouter.get(
  "/class-discipline/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  progressController.getClassDisciplineProgress,
);

export default progressRouter;
