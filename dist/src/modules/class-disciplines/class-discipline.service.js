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
exports.ClassDisciplineService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const paginate_1 = require("../../utils/paginate");
const classDisciplineSelect = {
    id: true,
    classroom: {
        select: {
            id: true,
            name: true,
            semester: true,
            year: true,
        },
    },
    discipline: {
        select: {
            id: true,
            name: true,
        },
    },
    teacher: {
        select: {
            id: true,
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    },
};
class ClassDisciplineService {
    // Method to create a class discipline
    createClassDiscipline(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.classDiscipline.create({
                data,
                select: classDisciplineSelect,
            });
        });
    }
    // Method to list all class disciplines
    listAllClassDisciplines(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.classDiscipline.count(),
                prisma_1.default.classDiscipline.findMany({
                    skip,
                    take: limit,
                    select: classDisciplineSelect,
                }),
            ]);
            return (0, paginate_1.buildPaginatedResponse)(data, page, limit, total);
        });
    }
    // Method to get a class discipline by ID
    getClassDisciplineById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.classDiscipline.findUnique({
                where: { id },
                select: classDisciplineSelect,
            });
            if (!result)
                throw new Error("CLASS_DISCIPLINE_NOT_FOUND");
            return result;
        });
    }
    // Method to update a class discipline by ID
    updateClassDisciplineById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.classDiscipline.findUnique({ where: { id } });
            if (!exists)
                throw new Error("CLASS_DISCIPLINE_NOT_FOUND");
            return yield prisma_1.default.classDiscipline.update({
                where: { id },
                data,
                select: classDisciplineSelect,
            });
        });
    }
    // Method to delete a class discipline by ID
    deleteClassDisciplineById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.classDiscipline.findUnique({ where: { id } });
            if (!exists)
                throw new Error("CLASS_DISCIPLINE_NOT_FOUND");
            yield prisma_1.default.classDiscipline.delete({ where: { id } });
        });
    }
}
exports.ClassDisciplineService = ClassDisciplineService;
