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
exports.CourseController = void 0;
const course_validate_1 = require("./course.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
        this.createCourse = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = course_validate_1.createCourseSchema.parse(req.body);
                const result = yield this.courseService.createCourse(data);
                res
                    .status(201)
                    .json({ message: "Course created successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        this.getCourses = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.courseService.getCourses(page, limit);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        this.getCourseById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.courseService.getCourseById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateCourseById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = course_validate_1.updateCourseSchema.parse(req.body);
                const result = yield this.courseService.updateCourseById(id, data);
                res
                    .status(200)
                    .json({ message: "Course updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteCourseById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.courseService.deleteCourseById(id);
                res.status(200).json({ message: "Course deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CourseController = CourseController;
