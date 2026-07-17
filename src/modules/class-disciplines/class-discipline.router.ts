import { Router } from "express";
import { ClassDisciplineService } from "./class-discipline.service";
import { ClassDisciplineController } from "./class-discipline.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";

const classDisciplineRouter = Router();
const classDisciplineService = new ClassDisciplineService();
const classDisciplineController = new ClassDisciplineController(
  classDisciplineService,
);

classDisciplineRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  classDisciplineController.createClassDiscipline,
);
classDisciplineRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  classDisciplineController.listAllClassDisciplines,
);
classDisciplineRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER"),
  classDisciplineController.getClassDisciplineById,
);
classDisciplineRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  classDisciplineController.updateClassDisciplineById,
);
classDisciplineRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  classDisciplineController.deleteClassDisciplineById,
);

export default classDisciplineRouter;
