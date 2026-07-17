"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgressSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProgressSchema = zod_1.default
    .object({
    studentId: zod_1.default.int().positive(),
    lessonId: zod_1.default.int().positive(),
    classDisciplineId: zod_1.default.int().positive(),
})
    .strict();
