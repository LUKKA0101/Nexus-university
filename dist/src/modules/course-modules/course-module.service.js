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
exports.CourseModuleService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const paginate_1 = require("../../utils/paginate");
const courseModuleSelect = {
    id: true,
    title: true,
    discipline: {
        select: {
            id: true,
            name: true,
        },
    },
};
class CourseModuleService {
    // Method to create a course module
    createCourseModule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.courseModule.create({
                data,
                select: courseModuleSelect,
            });
        });
    }
    // Method to list all course modules
    listAllCourseModules(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.courseModule.count(),
                prisma_1.default.courseModule.findMany({
                    skip,
                    take: limit,
                    select: courseModuleSelect,
                }),
            ]);
            return (0, paginate_1.buildPaginatedResponse)(data, page, limit, total);
        });
    }
    // Method to get a course module by ID
    getCourseModuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.courseModule.findUnique({
                where: { id },
                select: courseModuleSelect,
            });
            if (!result)
                throw new Error("COURSE_MODULE_NOT_FOUND");
            return result;
        });
    }
    // Method to get lessons of a course module
    getCourseModuleLessons(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const result = yield prisma_1.default.courseModule.findUnique({
                where: { id },
                select: {
                    title: true,
                    discipline: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    lessons: {
                        skip,
                        take: limit,
                        select: {
                            id: true,
                            title: true,
                            videoUrl: true,
                        },
                    },
                    _count: {
                        select: { lessons: true },
                    },
                },
            });
            if (!result)
                throw new Error("COURSE_MODULE_NOT_FOUND");
            return {
                module: result.title,
                discipline: result.discipline,
                lessons: result.lessons,
                meta: {
                    total: result._count.lessons,
                    page,
                    limit,
                    totalPages: Math.ceil(result._count.lessons / limit),
                },
            };
        });
    }
    // Method to update a course module by ID
    updateCourseModuleById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.courseModule.findUnique({ where: { id } });
            if (!exists)
                throw new Error("COURSE_MODULE_NOT_FOUND");
            return yield prisma_1.default.courseModule.update({
                where: { id },
                data,
                select: courseModuleSelect,
            });
        });
    }
    // Method to delete a course module by ID
    deleteCourseModuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.courseModule.findUnique({ where: { id } });
            if (!exists)
                throw new Error("COURSE_MODULE_NOT_FOUND");
            yield prisma_1.default.courseModule.delete({ where: { id } });
        });
    }
}
exports.CourseModuleService = CourseModuleService;
