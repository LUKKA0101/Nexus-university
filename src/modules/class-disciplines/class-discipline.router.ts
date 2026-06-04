import { Router } from "express";
import { ClassDisciplineService } from "./class-discipline.service";
import { ClassDisciplineController } from "./class-discipline.controller";

export const classDisciplineRouter = Router();
const classDisciplineService = new ClassDisciplineService();
const classDisciplineController = new ClassDisciplineController(
  classDisciplineService,
);

classDisciplineRouter.post(
  "/",
  classDisciplineController.createClassDiscipline,
);
classDisciplineRouter.put(
  "/:id",
  classDisciplineController.updateClassDiscipline,
);
classDisciplineRouter.delete(
  "/:id",
  classDisciplineController.deleteClassDiscipline,
);
classDisciplineRouter.get(
  "/:id",
  classDisciplineController.getClassDisciplineById,
);
