import { Router } from "express";
import { ClassDisciplineService } from "./class-discipline.service";
import { ClassDisciplineController } from "./class-discipline.controller";

const classDisciplineRouter = Router();
const classDisciplineService = new ClassDisciplineService();
const classDisciplineController = new ClassDisciplineController(
  classDisciplineService,
);

classDisciplineRouter.post(
  "/",
  classDisciplineController.createClassDiscipline,
);
classDisciplineRouter.get(
  "/",
  classDisciplineController.listAllClassDisciplines,
);
classDisciplineRouter.get(
  "/:id",
  classDisciplineController.getClassDisciplineById,
);
classDisciplineRouter.put(
  "/:id",
  classDisciplineController.updateClassDisciplineById,
);
classDisciplineRouter.delete(
  "/:id",
  classDisciplineController.deleteClassDisciplineById,
);

export default classDisciplineRouter;
