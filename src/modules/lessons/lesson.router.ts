import { Router } from "express";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";

export const lessonRouter = Router();
const lessonService = new LessonService();
const lessonController = new LessonController(lessonService);

lessonRouter.post("/", lessonController.createLesson);
lessonRouter.put("/:id", lessonController.updateLesson);
lessonRouter.delete("/:id", lessonController.deleteLesson);
lessonRouter.get("/:id", lessonController.getLessonById);
