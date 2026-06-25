import { Router } from "express";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";

const lessonRouter = Router();
const lessonService = new LessonService();
const lessonController = new LessonController(lessonService);

lessonRouter.post("/", lessonController.createLesson);
lessonRouter.get("/:id", lessonController.getLessonById);
lessonRouter.put("/:id", lessonController.updateLessonById);
lessonRouter.delete("/:id", lessonController.deleteLessonById);

export default lessonRouter;
