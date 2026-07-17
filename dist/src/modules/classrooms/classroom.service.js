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
exports.ClassroomService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const classroomSelect = {
    id: true,
    name: true,
    semester: true,
    year: true,
    course: {
        select: {
            id: true,
            name: true,
        },
    },
};
class ClassroomService {
    // Method to create a classroom
    createClassroom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.classroom.create({
                data,
                select: classroomSelect,
            });
        });
    }
    // Method to list all classrooms
    listAllClassrooms(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.classroom.count(),
                prisma_1.default.classroom.findMany({
                    skip,
                    take: limit,
                    select: classroomSelect,
                }),
            ]);
            return {
                data: data.map((classroom) => (Object.assign({}, classroom))),
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        });
    }
    // Method to get a classroom by ID
    getClassroomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.classroom.findUnique({
                where: { id },
                select: classroomSelect,
            });
            if (!result)
                throw new Error("CLASSROOM_NOT_FOUND");
            return result;
        });
    }
    // Method to list students of a classroom
    getClassroomStudents(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const classroom = yield prisma_1.default.classroom.findUnique({
                where: { id },
                select: {
                    name: true,
                    course: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    students: {
                        skip,
                        take: limit,
                        select: {
                            id: true,
                            registration: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    birthDate: true,
                                    role: true,
                                },
                            },
                        },
                    },
                    _count: {
                        select: { students: true },
                    },
                },
            });
            if (!classroom)
                throw new Error("CLASSROOM_NOT_FOUND");
            const { _count } = classroom, rest = __rest(classroom, ["_count"]);
            return Object.assign(Object.assign({}, rest), { meta: {
                    total: _count.students,
                    page,
                    limit,
                    totalPages: Math.ceil(_count.students / limit),
                } });
        });
    }
    // Method to list disciplines of a classroom
    getClassroomDisciplines(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const result = yield prisma_1.default.classroom.findUnique({
                where: { id },
                select: {
                    name: true,
                    classDisciplines: {
                        skip,
                        take: limit,
                        select: {
                            id: true,
                            discipline: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                            teacher: {
                                select: {
                                    id: true,
                                    user: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    _count: {
                        select: { classDisciplines: true },
                    },
                },
            });
            if (!result)
                throw new Error("CLASSROOM_NOT_FOUND");
            return {
                classroom: result.name,
                disciplines: result.classDisciplines.map((cd) => ({
                    classDisciplineId: cd.id,
                    discipline: cd.discipline,
                    teacher: {
                        teacherId: cd.teacher.id,
                        name: cd.teacher.user.name,
                    },
                })),
                meta: {
                    total: result._count.classDisciplines,
                    page,
                    limit,
                    totalPages: Math.ceil(result._count.classDisciplines / limit),
                },
            };
        });
    }
    // Method to update a classroom by ID
    updateClassroomById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.classroom.findUnique({ where: { id } });
            if (!exists)
                throw new Error("CLASSROOM_NOT_FOUND");
            return yield prisma_1.default.classroom.update({
                where: { id },
                data,
                select: classroomSelect,
            });
        });
    }
    // Method to delete a classroom by ID
    deleteClassroomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.classroom.findUnique({ where: { id } });
            if (!exists)
                throw new Error("CLASSROOM_NOT_FOUND");
            yield prisma_1.default.classroom.delete({ where: { id } });
        });
    }
}
exports.ClassroomService = ClassroomService;
