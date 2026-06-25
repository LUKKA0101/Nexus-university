import { Router } from "express";
import { DisciplineService } from "./discipline.service";
import { DisciplineController } from "./discipline.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";

const disciplineRouter = Router();
const disciplineService = new DisciplineService();
const disciplineController = new DisciplineController(disciplineService);

disciplineRouter.post(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  disciplineController.createDiscipline,
);
disciplineRouter.get(
  "/",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  disciplineController.listAllDisciplines,
);
disciplineRouter.get(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  disciplineController.getDisciplineById,
);
disciplineRouter.get(
  "/:id/modules",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR", "TEACHER", "STUDENT"),
  disciplineController.getDisciplineModules,
);
disciplineRouter.put(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  disciplineController.updateDisciplineById,
);
disciplineRouter.delete(
  "/:id",
  authMiddleware,
  authMiddlewareRoles("DIRECTOR"),
  disciplineController.deleteDisciplineById,
);

export default disciplineRouter;
