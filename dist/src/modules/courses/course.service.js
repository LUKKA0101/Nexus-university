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
exports.CourseService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const courseSelect = {
    id: true,
    name: true,
    classrooms: {
        select: {
            id: true,
            name: true,
            semester: true,
            year: true,
        },
    },
};
class CourseService {
    createCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.course.create({
                data,
                select: courseSelect,
            });
        });
    }
    getCourses(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.course.count(),
                prisma_1.default.course.findMany({
                    skip,
                    take: limit,
                    select: courseSelect,
                }),
            ]);
            return {
                data: data.map((course) => (Object.assign({}, course))),
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.course.findUnique({
                where: { id },
                select: courseSelect,
            });
            if (!result)
                throw new Error("COURSE_NOT_FOUND");
            return result;
        });
    }
    updateCourseById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.course.findUnique({ where: { id } });
            if (!exists)
                throw new Error("COURSE_NOT_FOUND");
            return yield prisma_1.default.course.update({
                where: { id },
                data,
                select: courseSelect,
            });
        });
    }
    deleteCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.course.findUnique({ where: { id } });
            if (!exists)
                throw new Error("COURSE_NOT_FOUND");
            yield prisma_1.default.course.delete({ where: { id } });
        });
    }
}
exports.CourseService = CourseService;
