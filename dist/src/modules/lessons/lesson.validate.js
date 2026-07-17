"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonSchema = exports.createLessonSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createLessonSchema = zod_1.default
    .object({
    title: zod_1.default.string().trim().min(1),
    videoUrl: zod_1.default.url().optional(),
    moduleId: zod_1.default.int().positive(),
})
    .strict();
exports.updateLessonSchema = exports.createLessonSchema.partial().strict();
