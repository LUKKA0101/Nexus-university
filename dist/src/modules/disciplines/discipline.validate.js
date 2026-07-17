"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDisciplineSchema = exports.createDisciplineSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createDisciplineSchema = zod_1.default
    .object({
    name: zod_1.default.string().trim().min(1),
})
    .strict();
exports.updateDisciplineSchema = exports.createDisciplineSchema.partial().strict();
