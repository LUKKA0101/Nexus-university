"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClassroomSchema = exports.createClassroomSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createClassroomSchema = zod_1.default
    .object({
    name: zod_1.default.string().trim().min(1),
    semester: zod_1.default.int().positive(),
    year: zod_1.default.int().positive(),
    courseId: zod_1.default.int().positive().optional(),
})
    .strict();
exports.updateClassroomSchema = exports.createClassroomSchema
    .omit({
    year: true,
})
    .partial()
    .strict();
