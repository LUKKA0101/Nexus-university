"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.payloadSchema = zod_1.default.object({
    userId: zod_1.default.int(),
    role: zod_1.default.enum(["STUDENT", "TEACHER", "DIRECTOR"]),
});
