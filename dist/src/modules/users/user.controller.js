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
exports.UserController = void 0;
const user_validate_1 = require("./user.validate");
const pagination_validate_1 = require("../../utils/pagination.validate");
class UserController {
    constructor(userService) {
        this.userService = userService;
        // Method to register a new user
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dataUser = user_validate_1.registerSchema.parse(req.body);
                let dataStudent;
                // If the user is a student, parse the student-specific fields
                if (dataUser.role === "STUDENT") {
                    dataStudent = user_validate_1.studentRegisterSchema.parse(req.body);
                }
                const result = yield this.userService.registerUser(dataUser, dataStudent);
                res.status(201).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to list all users
        this.getAllUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit } = pagination_validate_1.paginationQuerySchema.parse(req.query);
                const result = yield this.userService.listAllUser(page, limit);
                res.status(200).json({
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to get a user by ID
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const result = yield this.userService.listUserById(id);
                res.status(200).json({
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to update a user by ID
        this.updateUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = user_validate_1.updateUserSchema.parse(req.body);
                const result = yield this.userService.updateUserById(id, data);
                res.status(200).json({
                    message: "User updated successfully",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Method to delete a user by ID
        this.deleteUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.userService.deleteUserById(id);
                res.status(200).json({
                    message: "User deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
