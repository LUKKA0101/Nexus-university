import { Router } from "express";
import { CollegeClassController } from "./classrooms.controller";
import { ClassroomService } from "./classrooms.service";

export const classroomRouter = Router();

const serviceController = new ClassroomService();
const classController = new CollegeClassController(serviceController);

/* POST */

classroomRouter.post("/", classController.createClass);

/* GET */

classroomRouter.get("/", classController.getAllClass);
classroomRouter.get("/:id", classController.getClassById);
classroomRouter.get("/:id/students", classController.getStudentsByClassroom);

/* PUT */

classroomRouter.put("/:id", classController.updateClass);

/* DELETE */

classroomRouter.delete("/:id", classController.deleteClass);
