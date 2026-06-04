import { Router } from "express";

import { authRouter } from "../modules/auth/auth.router";
import { classroomRouter } from "../modules/classrooms/classrooms.router";
import { courseRouter } from "../modules/courses/course.router";
import { disciplineRouter } from "../modules/disciplines/discipline.router";
import { classDisciplineRouter } from "../modules/class-disciplines/class-discipline.router";
import { courseModuleRouter } from "../modules/course-modules/course-module.router";
import { lessonRouter } from "../modules/lessons/lesson.router";
import { progressRouter } from "../modules/progress/progress.router";

export const router = Router();

router.use("/auth", authRouter);
router.use("/classroom", classroomRouter);
router.use("/course", courseRouter);
router.use("/discipline", disciplineRouter);
router.use("/class-discipline", classDisciplineRouter);
router.use("/module", courseModuleRouter);
router.use("/lesson", lessonRouter);
router.use("/progress", progressRouter);
