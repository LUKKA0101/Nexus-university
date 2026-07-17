"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseModuleSchema = exports.createCourseModuleSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCourseModuleSchema = zod_1.default
    .object({
    title: zod_1.default.string().trim().min(1),
    disciplineId: zod_1.default.int().positive(),
})
    .strict();
exports.updateCourseModuleSchema = exports.createCourseModuleSchema
    .partial()
    .strict();
