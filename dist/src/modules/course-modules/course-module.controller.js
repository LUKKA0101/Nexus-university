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
exports.CourseModuleController = void 0;
const course_module_validate_1 = require("./course-module.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class CourseModuleController {
    constructor(courseModuleService) {
        this.courseModuleService = courseModuleService;
        // Method to create a course module
        this.createCourseModule = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = course_module_validate_1.createCourseModuleSchema.parse(req.body);
                const result = yield this.courseModuleService.createCourseModule(data);
                res
                    .status(201)
                    .json({ message: "Course module created successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to list all course modules
        this.listAllCourseModules = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.courseModuleService.listAllCourseModules(page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a course module by ID
        this.getCourseModuleById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.courseModuleService.getCourseModuleById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get lessons of a course module
        this.getCourseModuleLessons = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const id = Number(req.params.id);
                const result = yield this.courseModuleService.getCourseModuleLessons(id, page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a course module by ID
        this.updateCourseModuleById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = course_module_validate_1.updateCourseModuleSchema.parse(req.body);
                const result = yield this.courseModuleService.updateCourseModuleById(id, data);
                res
                    .status(200)
                    .json({ message: "Course module updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a course module by ID
        this.deleteCourseModuleById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.courseModuleService.deleteCourseModuleById(id);
                res.status(200).json({ message: "Course module deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CourseModuleController = CourseModuleController;
