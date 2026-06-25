import { Router } from "express";

import authRouter from "../modules/auth/auth.router";
import studentRouter from "../modules/students/student.router";
import teacherRouter from "../modules/teachers/teacher.router";
import classroomRouter from "../modules/classrooms/classroom.router";
import courseRouter from "../modules/courses/course.router";
import disciplineRouter from "../modules/disciplines/discipline.router";
import classDisciplineRouter from "../modules/class-disciplines/class-discipline.router";
import courseModuleRouter from "../modules/course-modules/course-module.router";
import lessonRouter from "../modules/lessons/lesson.router";
import progressRouter from "../modules/progress/progress.router";
import userRouter from "../modules/users/user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/students", studentRouter);
router.use("/teachers", teacherRouter);
router.use("/classroom", classroomRouter);
router.use("/course", courseRouter);
router.use("/discipline", disciplineRouter);
router.use("/class-discipline", classDisciplineRouter);
router.use("/module", courseModuleRouter);
router.use("/lesson", lessonRouter);
router.use("/progress", progressRouter);
router.use("/user", userRouter);

export default router;
