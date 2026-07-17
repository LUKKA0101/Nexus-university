"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateTeacherSchema = zod_1.default
    .object({
    name: zod_1.default.string().trim().min(1).optional(),
    email: zod_1.default.email().optional(),
    birthDate: zod_1.default.date().optional(),
})
    .strict();
