import { Router } from "express";
import { CourseModuleService } from "./course-module.service";
import { CourseModuleController } from "./course-module.controller";

export const courseModuleRouter = Router();
const moduleService = new CourseModuleService();
const moduleController = new CourseModuleController(moduleService);

courseModuleRouter.post("/", moduleController.createModule);
courseModuleRouter.put("/:id", moduleController.updateModule);
courseModuleRouter.delete("/:id", moduleController.deleteModule);
courseModuleRouter.get("/:id", moduleController.getModuleById);
