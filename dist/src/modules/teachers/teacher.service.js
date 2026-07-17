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
exports.TeacherService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const paginate_1 = require("../../utils/paginate");
const teacherSelect = {
    id: true,
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
    classDisciplines: {
        select: {
            id: true,
            classroom: {
                select: {
                    id: true,
                    name: true,
                    semester: true,
                    year: true,
                },
            },
            discipline: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
};
class TeacherService {
    // Method to list all teachers
    listAllTeachers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.teacher.count(),
                prisma_1.default.teacher.findMany({
                    skip,
                    take: limit,
                    select: teacherSelect,
                }),
            ]);
            const formattedData = data.map((teacher) => (Object.assign(Object.assign({}, teacher), { user: Object.assign(Object.assign({}, teacher.user), { birthDate: teacher.user.birthDate.toISOString().split("T")[0], createdAt: teacher.user.createdAt.toISOString().split("T")[0] }) })));
            return (0, paginate_1.buildPaginatedResponse)(formattedData, page, limit, total);
        });
    }
    // Method to get a teacher by ID
    getTeacherById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.teacher.findUnique({
                where: { id },
                select: teacherSelect,
            });
            if (!result)
                throw new Error("TEACHER_NOT_FOUND");
            return Object.assign(Object.assign({ teacherId: result.id }, result.user), { birthDate: result.user.birthDate.toISOString().split("T")[0], createdAt: result.user.createdAt.toISOString().split("T")[0] });
        });
    }
    // Method to get a teacher disciplines by ID
    getTeacherDisciplines(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const result = yield prisma_1.default.teacher.findUnique({
                where: { id },
                select: {
                    user: { select: { name: true } },
                    classDisciplines: {
                        skip,
                        take: limit,
                        select: {
                            id: true,
                            classroom: {
                                select: {
                                    id: true,
                                    name: true,
                                    semester: true,
                                    year: true,
                                },
                            },
                            discipline: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    _count: { select: { classDisciplines: true } },
                },
            });
            if (!result)
                throw new Error("TEACHER_NOT_FOUND");
            const { user, classDisciplines, _count } = result;
            return Object.assign({ teacherName: user.name }, (0, paginate_1.buildPaginatedResponse)(classDisciplines, page, limit, _count.classDisciplines));
        });
    }
    // Method to update a teacher by ID
    updateTeacherById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.teacher.findUnique({ where: { id } });
            if (!exists)
                throw new Error("TEACHER_NOT_FOUND");
            const userData = {};
            if (data.name !== undefined)
                userData.name = data.name;
            if (data.email !== undefined)
                userData.email = data.email;
            if (data.birthDate !== undefined)
                userData.birthDate = new Date(data.birthDate);
            const result = yield prisma_1.default.teacher.update({
                where: { id },
                data: {
                    user: { update: userData },
                },
                select: teacherSelect,
            });
            return Object.assign(Object.assign({ teacherId: result.id }, result.user), { birthDate: result.user.birthDate.toISOString().split("T")[0], createdAt: result.user.createdAt.toISOString().split("T")[0] });
        });
    }
    // Method to delete a teacher by ID
    deleteTeacherById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.teacher.findUnique({ where: { id } });
            if (!exists)
                throw new Error("TEACHER_NOT_FOUND");
            yield prisma_1.default.teacher.delete({ where: { id } });
        });
    }
}
exports.TeacherService = TeacherService;
