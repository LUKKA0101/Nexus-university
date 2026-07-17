"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.studentRegisterSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const role = zod_1.default.enum(["STUDENT", "TEACHER", "DIRECTOR"]);
exports.registerSchema = zod_1.default.object({
    name: zod_1.default.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres"),
    birthDate: zod_1.default.coerce.date(),
    email: zod_1.default.email("Email é obrigatório").trim(),
    role,
});
exports.studentRegisterSchema = exports.registerSchema.extend({
    registration: zod_1.default
        .string()
        .trim()
        .regex(/^\d+$/, "Matrícula deve conter apenas números")
        .min(8, "A matrícula deve conter no mínimo 8 dígitos"),
    classroomId: zod_1.default.number().positive("ID da classe é obrigatório"),
});
exports.updateUserSchema = exports.registerSchema
    .omit({ birthDate: true })
    .partial();
