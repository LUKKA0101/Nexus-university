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
exports.LessonService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const lessonSelect = {
    id: true,
    title: true,
    videoUrl: true,
    module: {
        select: {
            id: true,
            title: true,
            discipline: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
};
class LessonService {
    // Method to create a lesson
    createLesson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.lesson.create({
                data,
                select: lessonSelect,
            });
        });
    }
    // Method to get a lesson by ID
    getLessonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.lesson.findUnique({
                where: { id },
                select: lessonSelect,
            });
            if (!result)
                throw new Error("LESSON_NOT_FOUND");
            return result;
        });
    }
    // Method to update a lesson by ID
    updateLessonById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.lesson.findUnique({ where: { id } });
            if (!exists)
                throw new Error("LESSON_NOT_FOUND");
            return yield prisma_1.default.lesson.update({
                where: { id },
                data,
                select: lessonSelect,
            });
        });
    }
    // Method to delete a lesson by ID
    deleteLessonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.lesson.findUnique({ where: { id } });
            if (!exists)
                throw new Error("LESSON_NOT_FOUND");
            yield prisma_1.default.lesson.delete({ where: { id } });
        });
    }
}
exports.LessonService = LessonService;
