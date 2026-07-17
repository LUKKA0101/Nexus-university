"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateStudentSchema = zod_1.default
    .object({
    registration: zod_1.default
        .string()
        .trim()
        .regex(/^\d+$/, "Registration must contain only numbers")
        .min(8, "Registration must have at least 8 digits")
        .optional(),
    classroomId: zod_1.default.int().positive().optional(),
})
    .strict();
