import { Router } from "express";
import { ProgressService } from "./progress.service";
import { ProgressController } from "./progress.controller";

export const progressRouter = Router();
const progressService = new ProgressService();
const progressController = new ProgressController(progressService);

progressRouter.post("/", progressController.createProgress);
progressRouter.delete("/:id", progressController.deleteProgress);
progressRouter.get(
  "/student/:studentId",
  progressController.getProgressByStudent,
);
