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
exports.TeacherController = void 0;
const teacher_validate_1 = require("./teacher.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class TeacherController {
    constructor(teacherService) {
        this.teacherService = teacherService;
        // Method to list all teachers
        this.listAllTeachers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.teacherService.listAllTeachers(page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a teacher by ID
        this.getTeacherById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.teacherService.getTeacherById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a teacher disciplines by ID
        this.getTeacherDisciplines = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.teacherService.getTeacherDisciplines(id, page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a teacher by ID
        this.updateTeacherById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = teacher_validate_1.updateTeacherSchema.parse(req.body);
                const result = yield this.teacherService.updateTeacherById(id, data);
                res
                    .status(200)
                    .json({ message: "Teacher updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a teacher by ID
        this.deleteTeacherById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.teacherService.deleteTeacherById(id);
                res.status(200).json({ message: "Teacher deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TeacherController = TeacherController;
