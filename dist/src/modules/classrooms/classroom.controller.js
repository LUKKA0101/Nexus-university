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
exports.ClassroomController = void 0;
const classroom_validate_1 = require("./classroom.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class ClassroomController {
    constructor(classroomService) {
        this.classroomService = classroomService;
        // Method to create a classroom
        this.createClassroom = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = classroom_validate_1.createClassroomSchema.parse(req.body);
                const result = yield this.classroomService.createClassroom(data);
                res
                    .status(201)
                    .json({ message: "Classroom created successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to list all classrooms
        this.listAllClassrooms = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.classroomService.listAllClassrooms(page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a classroom by ID
        this.getClassroomById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.classroomService.getClassroomById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get students of a classroom
        this.getClassroomStudents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const id = Number(req.params.id);
                const result = yield this.classroomService.getClassroomStudents(id, page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get disciplines of a classroom
        this.getClassroomDisciplines = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const id = Number(req.params.id);
                const result = yield this.classroomService.getClassroomDisciplines(id, page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a classroom by ID
        this.updateClassroomById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = classroom_validate_1.updateClassroomSchema.parse(req.body);
                const result = yield this.classroomService.updateClassroomById(id, data);
                res
                    .status(200)
                    .json({ message: "Classroom updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a classroom by ID
        this.deleteClassroomById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.classroomService.deleteClassroomById(id);
                res.status(200).json({ message: "Classroom deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ClassroomController = ClassroomController;
