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
exports.LessonController = void 0;
const lesson_validate_1 = require("./lesson.validate");
class LessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
        // Method to create a lesson
        this.createLesson = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = lesson_validate_1.createLessonSchema.parse(req.body);
                const result = yield this.lessonService.createLesson(data);
                res
                    .status(201)
                    .json({ message: "Lesson created successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a lesson by ID
        this.getLessonById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.lessonService.getLessonById(id);
                res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a lesson by ID
        this.updateLessonById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = lesson_validate_1.updateLessonSchema.parse(req.body);
                const result = yield this.lessonService.updateLessonById(id, data);
                res
                    .status(200)
                    .json({ message: "Lesson updated successfully", data: result });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a lesson by ID
        this.deleteLessonById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.lessonService.deleteLessonById(id);
                res.status(200).json({ message: "Lesson deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LessonController = LessonController;
