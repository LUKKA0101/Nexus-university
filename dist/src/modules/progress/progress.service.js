"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const progressSelect = {
    id: true,
    completed: true,
    watchedAt: true,
    completedAt: true,
    student: {
        select: {
            id: true,
            registration: true,
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    },
    lesson: {
        select: {
            id: true,
            title: true,
            videoUrl: true,
        },
    },
    classDiscipline: {
        select: {
            id: true,
            discipline: {
                select: {
                    id: true,
                    name: true,
                },
            },
            classroom: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
};
class ProgressService {
    // Method to register a lesson watch
    createProgress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId, lessonId, classDisciplineId } = data;
            const student = yield prisma_1.default.student.findUnique({
                where: { id: studentId },
                select: { classroomId: true },
            });
            if (!student)
                throw new Error("STUDENT_NOT_FOUND");
            const classDiscipline = yield prisma_1.default.classDiscipline.findUnique({
                where: { id: classDisciplineId },
                select: { classroomId: true, disciplineId: true },
            });
            if (!classDiscipline)
                throw new Error("CLASS_DISCIPLINE_NOT_FOUND");
            if (classDiscipline.classroomId !== student.classroomId) {
                throw new Error("FORBIDDEN");
            }
            const lesson = yield prisma_1.default.lesson.findUnique({
                where: { id: lessonId },
                select: { module: { select: { disciplineId: true } } },
            });
            if (!lesson)
                throw new Error("LESSON_NOT_FOUND");
            if (lesson.module.disciplineId !== classDiscipline.disciplineId) {
                throw new Error("FORBIDDEN");
            }
            return yield prisma_1.default.progress.create({
                data,
                select: progressSelect,
            });
        });
    }
    // Method to mark a lesson as complete
    completeProgress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.progress.findUnique({ where: { id } });
            if (!exists)
                throw new Error("PROGRESS_NOT_FOUND");
            if (exists.completed)
                throw new Error("PROGRESS_ALREADY_COMPLETED");
            return yield prisma_1.default.progress.update({
                where: { id },
                data: {
                    completed: true,
                    completedAt: new Date(),
                },
                select: progressSelect,
            });
        });
    }
    // Method to get full progress of a student
    getStudentProgress(studentId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const student = yield prisma_1.default.student.findUnique({
                where: { id: studentId },
                select: {
                    id: true,
                    registration: true,
                    user: { select: { name: true, email: true } },
                    _count: { select: { progress: true } },
                    progress: {
                        skip,
                        take: limit,
                        select: {
                            id: true,
                            completed: true,
                            watchedAt: true,
                            completedAt: true,
                            lesson: {
                                select: {
                                    id: true,
                                    title: true,
                                },
                            },
                            classDiscipline: {
                                select: {
                                    id: true,
                                    discipline: { select: { id: true, name: true } },
                                    classroom: { select: { id: true, name: true } },
                                },
                            },
                        },
                    },
                },
            });
            if (!student)
                throw new Error("STUDENT_NOT_FOUND");
            const { _count } = student, rest = __rest(student, ["_count"]);
            return Object.assign(Object.assign(Object.assign({}, rest), student.user), { meta: {
                    total: _count.progress,
                    page,
                    limit,
                    totalPages: Math.ceil(_count.progress / limit),
                } });
        });
    }
    // Method to get progress of a class discipline
    getClassDisciplineProgress(classDisciplineId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const classDiscipline = yield prisma_1.default.classDiscipline.findUnique({
                where: { id: classDisciplineId },
                select: {
                    id: true,
                    discipline: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    classroom: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    progress: {
                        skip,
                        take: limit,
                        select: {
                            id: true,
                            completed: true,
                            watchedAt: true,
                            completedAt: true,
                            student: {
                                select: {
                                    id: true,
                                    registration: true,
                                    user: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                            lesson: {
                                select: {
                                    id: true,
                                    title: true,
                                },
                            },
                        },
                    },
                    _count: {
                        select: { progress: true },
                    },
                },
            });
            if (!classDiscipline)
                throw new Error("CLASS_DISCIPLINE_NOT_FOUND");
            return {
                classDisciplineId: classDiscipline.id,
                discipline: classDiscipline.discipline,
                classroom: classDiscipline.classroom,
                progress: classDiscipline.progress.map((p) => ({
                    progressId: p.id,
                    completed: p.completed,
                    watchedAt: p.watchedAt,
                    completedAt: p.completedAt,
                    lesson: p.lesson,
                    student: {
                        studentId: p.student.id,
                        registration: p.student.registration,
                        name: p.student.user.name,
                    },
                })),
                meta: {
                    total: classDiscipline._count.progress,
                    page,
                    limit,
                    totalPages: Math.ceil(classDiscipline._count.progress / limit),
                },
            };
        });
    }
}
exports.ProgressService = ProgressService;
