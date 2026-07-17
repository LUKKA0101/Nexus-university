"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1),
})
    .strict();
exports.updateCourseSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1),
})
    .strict();
