"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClassDisciplineSchema = exports.createClassDisciplineSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createClassDisciplineSchema = zod_1.default
    .object({
    classroomId: zod_1.default.int().positive(),
    disciplineId: zod_1.default.int().positive(),
    teacherId: zod_1.default.int().positive(),
})
    .strict();
exports.updateClassDisciplineSchema = exports.createClassDisciplineSchema
    .omit({
    classroomId: true,
    teacherId: true,
})
    .partial()
    .strict();
