import { Router } from "express";
import { ProgressService } from "./progress.service";
import { ProgressController } from "./progress.controller";

const progressRouter = Router();
const progressService = new ProgressService();
const progressController = new ProgressController(progressService);

progressRouter.post("/", progressController.createProgress);
progressRouter.patch("/:id/complete", progressController.completeProgress);
progressRouter.get(
  "/student/:studentId",
  progressController.getStudentProgress,
);
progressRouter.get(
  "/class-discipline/:id",
  progressController.getClassDisciplineProgress,
);

export default progressRouter;
