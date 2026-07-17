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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const progress_validate_1 = require("./progress.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class ProgressController {
    constructor(progressService) {
        this.progressService = progressService;
        // Method to register a lesson watch
        this.createProgress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = progress_validate_1.createProgressSchema.parse(req.body);
                const result = yield this.progressService.createProgress(data);
                res
                    .status(201)
                    .json({ message: "Progress registered successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to mark a lesson as complete
        this.completeProgress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.progressService.completeProgress(id);
                res
                    .status(200)
                    .json({ message: "Lesson marked as completed", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get full progress of a student
        this.getStudentProgress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const studentId = Number(req.params.studentId);
                const result = yield this.progressService.getStudentProgress(studentId, page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get progress of a class discipline
        this.getClassDisciplineProgress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const id = Number(req.params.id);
                const result = yield this.progressService.getClassDisciplineProgress(id, page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProgressController = ProgressController;
