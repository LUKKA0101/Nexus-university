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
exports.ClassDisciplineController = void 0;
const class_discipline_validate_1 = require("./class-discipline.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class ClassDisciplineController {
    constructor(classDisciplineService) {
        this.classDisciplineService = classDisciplineService;
        // Method to create a class discipline
        this.createClassDiscipline = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = class_discipline_validate_1.createClassDisciplineSchema.parse(req.body);
                const result = yield this.classDisciplineService.createClassDiscipline(data);
                res.status(201).json({
                    message: "Class discipline created successfully",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to list all class disciplines
        this.listAllClassDisciplines = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.classDisciplineService.listAllClassDisciplines(page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a class discipline by ID
        this.getClassDisciplineById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.classDisciplineService.getClassDisciplineById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a class discipline by ID
        this.updateClassDisciplineById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = class_discipline_validate_1.updateClassDisciplineSchema.parse(req.body);
                const result = yield this.classDisciplineService.updateClassDisciplineById(id, data);
                res.status(200).json({
                    message: "Class discipline updated successfully",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a class discipline by ID
        this.deleteClassDisciplineById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.classDisciplineService.deleteClassDisciplineById(id);
                res
                    .status(200)
                    .json({ message: "Class discipline deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ClassDisciplineController = ClassDisciplineController;
