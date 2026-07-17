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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const studentSelect = {
    id: true,
    registration: true,
    classroom: true,
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            birthDate: true,
            role: true,
            createdAt: true,
        },
    },
};
class StudentService {
    // Method to list all students
    listAllStudents(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.student.count(),
                prisma_1.default.student.findMany({
                    skip,
                    take: limit,
                    select: studentSelect,
                }),
            ]);
            return {
                data: data.map((student) => (Object.assign(Object.assign({}, student), { user: Object.assign(Object.assign({}, student.user), { birthDate: student.user.birthDate.toISOString().split("T")[0], createdAt: student.user.createdAt.toISOString().split("T")[0] }) }))),
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        });
    }
    // Method to get a student by ID
    getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.student.findUnique({
                where: { id },
                select: studentSelect,
            });
            if (!result)
                throw new Error("STUDENT_NOT_FOUND");
            return Object.assign(Object.assign({ studentId: result.id }, result.user), { registration: result.registration, classroom: result.classroom, birthDate: result.user.birthDate.toISOString().split("T")[0], createdAt: result.user.createdAt.toISOString().split("T")[0] });
        });
    }
    // Method to get a student progress by ID
    getStudentProgress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.student.findUnique({
                where: { id },
                select: {
                    user: { select: { name: true } },
                    registration: studentSelect.registration,
                    progress: {
                        select: {
                            completed: true,
                            watchedAt: true,
                            completedAt: true,
                            lesson: { select: { title: true } },
                            classDiscipline: {
                                select: {
                                    discipline: { select: { name: true } },
                                },
                            },
                        },
                    },
                },
            });
            if (!result)
                throw new Error("STUDENT_NOT_FOUND");
            return {
                user: Object.assign(Object.assign({}, result.user), { registration: studentSelect.registration }),
                progress: result.progress,
            };
        });
    }
    // Method to update a student by ID
    updateStudentById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.student.findUnique({ where: { id } });
            if (!exists)
                throw new Error("STUDENT_NOT_FOUND");
            const result = yield prisma_1.default.student.update({
                where: { id },
                data: {
                    registration: data.registration,
                    classroomId: data.classroomId,
                },
                select: studentSelect,
            });
            return Object.assign(Object.assign({ studentId: result.id }, result.user), { registration: result.registration, classroom: result.classroom, birthDate: result.user.birthDate.toISOString().split("T")[0], createdAt: result.user.createdAt.toISOString().split("T")[0] });
        });
    }
    // Method to delete a student by ID
    deleteStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.student.findUnique({ where: { id } });
            if (!exists)
                throw new Error("STUDENT_NOT_FOUND");
            yield prisma_1.default.student.delete({ where: { id } });
        });
    }
}
exports.StudentService = StudentService;
