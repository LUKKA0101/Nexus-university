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
exports.StudentController = void 0;
const student_validate_1 = require("./student.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
        // Method to list all students
        this.listAllStudents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.studentService.listAllStudents(page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a student by ID
        this.getStudentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.studentService.getStudentById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a student progress by ID
        this.getStudentProgress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.studentService.getStudentProgress(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a student by ID
        this.updateStudentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = student_validate_1.updateStudentSchema.parse(req.body);
                const result = yield this.studentService.updateStudentById(id, data);
                res
                    .status(200)
                    .json({ message: "Student updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a student by ID
        this.deleteStudentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.studentService.deleteStudentById(id);
                res.status(200).json({ message: "Student deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.StudentController = StudentController;
