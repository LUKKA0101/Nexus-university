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
exports.DisciplineController = void 0;
const discipline_validate_1 = require("./discipline.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class DisciplineController {
    constructor(disciplineService) {
        this.disciplineService = disciplineService;
        // Method to create a discipline
        this.createDiscipline = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = discipline_validate_1.createDisciplineSchema.parse(req.body);
                const result = yield this.disciplineService.createDiscipline(data);
                res
                    .status(201)
                    .json({ message: "Discipline created successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to list all disciplines
        this.listAllDisciplines = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.disciplineService.listAllDisciplines(page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a discipline by ID
        this.getDisciplineById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.disciplineService.getDisciplineById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get modules of a discipline
        this.getDisciplineModules = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const id = Number(req.params.id);
                const result = yield this.disciplineService.getDisciplineModules(id, page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a discipline by ID
        this.updateDisciplineById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = discipline_validate_1.updateDisciplineSchema.parse(req.body);
                const result = yield this.disciplineService.updateDisciplineById(id, data);
                res
                    .status(200)
                    .json({ message: "Discipline updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a discipline by ID
        this.deleteDisciplineById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.disciplineService.deleteDisciplineById(id);
                res.status(200).json({ message: "Discipline deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.DisciplineController = DisciplineController;
