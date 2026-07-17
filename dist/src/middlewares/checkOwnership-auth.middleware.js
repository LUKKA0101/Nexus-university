"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOwnershipProgress = exports.checkOwnershipStudentFromBody = exports.checkOwnership = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const checkOwnership = (model, paramName = "id") => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "DIRECTOR") {
                return next();
            }
            if (model !== "teacher" && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "TEACHER") {
                return next();
            }
            const id = Number(req.params[paramName]);
            const record = yield prisma_1.default[model].findUnique({
                where: { id },
                select: { userId: true },
            });
            if (!record) {
                return res.status(404).json({ err: "NOT_FOUND" });
            }
            if (record.userId !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c.userId)) {
                return res.status(403).json({ err: "FORBIDDEN" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.checkOwnership = checkOwnership;
const checkOwnershipStudentFromBody = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const studentId = Number(req.body.studentId);
            const student = yield prisma_1.default.student.findUnique({
                where: { id: studentId },
                select: { userId: true },
            });
            if (!student)
                return res.status(404).json({ err: "STUDENT_NOT_FOUND" });
            if (student.userId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
                return res.status(403).json({ err: "FORBIDDEN" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.checkOwnershipStudentFromBody = checkOwnershipStudentFromBody;
const checkOwnershipProgress = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = Number(req.params.id);
            const progress = yield prisma_1.default.progress.findUnique({
                where: { id },
                select: { student: { select: { userId: true } } },
            });
            if (!progress)
                return res.status(404).json({ err: "NOT_FOUND" });
            if (progress.student.userId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
                return res.status(403).json({ err: "FORBIDDEN" });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.checkOwnershipProgress = checkOwnershipProgress;
