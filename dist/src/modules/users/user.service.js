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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const email_1 = require("../../infra/email");
const jwt_1 = require("../../utils/jwt");
const paginate_1 = require("../../utils/paginate");
const format_1 = require("../../utils/format");
const userSelect = {
    id: true,
    name: true,
    email: true,
    birthDate: true,
    role: true,
    createdAt: true,
};
class UserService {
    // Method to register user
    registerUser(dataUser, dataStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const birthDateAsDate = new Date(dataUser.birthDate);
                const user = yield tx.user.create({
                    data: Object.assign(Object.assign(Object.assign({ name: dataUser.name, birthDate: birthDateAsDate, email: dataUser.email, role: dataUser.role, password: null }, (dataUser.role === "STUDENT" && {
                        student: {
                            create: {
                                registration: dataStudent.registration,
                                classroomId: dataStudent.classroomId,
                            },
                        },
                    })), (dataUser.role === "TEACHER" && { teacher: { create: {} } })), (dataUser.role === "DIRECTOR" && { director: { create: {} } })),
                    select: userSelect,
                });
                const inviteToken = (0, jwt_1.generateInviteToken)(user.id);
                yield tx.user.update({
                    where: { id: user.id },
                    data: { inviteToken },
                });
                try {
                    yield (0, email_1.transporter)(user.email, inviteToken);
                }
                catch (_a) {
                    throw new Error("EMAIL_SEND_FAILED");
                }
                return Object.assign(Object.assign({}, user), { birthDate: user.birthDate.toISOString().split("T")[0], createdAt: user.createdAt.toISOString().split("T")[0] });
            }));
        });
    }
    // Method to list all users
    listAllUser(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.user.count(),
                prisma_1.default.user.findMany({
                    skip,
                    take: limit,
                    select: userSelect,
                }),
            ]);
            const formattedData = (0, format_1.formatDatesInArray)(data);
            return (0, paginate_1.buildPaginatedResponse)(formattedData, page, limit, total);
        });
    }
    // Method to list only one user via ID
    listUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.user.findUnique({
                where: { id },
                select: userSelect,
            });
            if (!result)
                throw new Error("USER_NOT_FOUND");
            return Object.assign(Object.assign({}, result), { birthDate: result.birthDate.toISOString().split("T")[0], createdAt: result.createdAt.toISOString().split("T")[0] });
        });
    }
    //Method to update user
    updateUserById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.user.update({
                where: { id },
                data,
                select: userSelect,
            });
            return Object.assign(Object.assign({}, result), { birthDate: result.birthDate.toISOString().split("T")[0], createdAt: result.createdAt.toISOString().split("T")[0] });
        });
    }
    //method to delete user
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.user.delete({ where: { id } });
        });
    }
}
exports.UserService = UserService;
