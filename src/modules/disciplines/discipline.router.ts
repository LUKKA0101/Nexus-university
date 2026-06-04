import { Router } from "express";
import { DisciplineService } from "./discipline.service";
import { DisciplineController } from "./discipline.controller";

export const disciplineRouter = Router();
const disciplineService = new DisciplineService();
const disciplineController = new DisciplineController(disciplineService);

disciplineRouter.post("/", disciplineController.createDiscipline);
disciplineRouter.put("/:id", disciplineController.updateDiscipline);
disciplineRouter.delete("/:id", disciplineController.deleteDiscipline);
disciplineRouter.get("/:id", disciplineController.getDisciplineById);
