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
exports.DisciplineService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const paginate_1 = require("../../utils/paginate");
const disciplineSelect = {
    id: true,
    name: true,
    _count: {
        select: { courseModules: true },
    },
};
class DisciplineService {
    // Method to create a discipline
    createDiscipline(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.discipline.create({
                data,
                select: disciplineSelect,
            });
        });
    }
    // Method to list all disciplines
    listAllDisciplines(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const [total, data] = yield prisma_1.default.$transaction([
                prisma_1.default.discipline.count(),
                prisma_1.default.discipline.findMany({
                    skip,
                    take: limit,
                    select: disciplineSelect,
                }),
            ]);
            return (0, paginate_1.buildPaginatedResponse)(data, page, limit, total);
        });
    }
    // Method to get a discipline by ID
    getDisciplineById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.discipline.findUnique({
                where: { id },
                select: disciplineSelect,
            });
            if (!result)
                throw new Error("DISCIPLINE_NOT_FOUND");
            return result;
        });
    }
    // Method to get modules of a discipline
    getDisciplineModules(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const result = yield prisma_1.default.discipline.findUnique({
                where: { id },
                select: {
                    name: true,
                    courseModules: {
                        skip,
                        take: limit,
                        select: {
                            id: true,
                            title: true,
                            _count: {
                                select: { lessons: true },
                            },
                        },
                    },
                    _count: {
                        select: { courseModules: true },
                    },
                },
            });
            if (!result)
                throw new Error("DISCIPLINE_NOT_FOUND");
            return {
                discipline: result.name,
                modules: result.courseModules.map((m) => ({
                    id: m.id,
                    title: m.title,
                    lessonsCount: m._count.lessons,
                })),
                meta: {
                    total: result._count.courseModules,
                    page,
                    limit,
                    totalPages: Math.ceil(result._count.courseModules / limit),
                },
            };
        });
    }
    // Method to update a discipline by ID
    updateDisciplineById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.discipline.findUnique({ where: { id } });
            if (!exists)
                throw new Error("DISCIPLINE_NOT_FOUND");
            return yield prisma_1.default.discipline.update({
                where: { id },
                data,
                select: disciplineSelect,
            });
        });
    }
    // Method to delete a discipline by ID
    deleteDisciplineById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.discipline.findUnique({ where: { id } });
            if (!exists)
                throw new Error("DISCIPLINE_NOT_FOUND");
            yield prisma_1.default.discipline.delete({ where: { id } });
        });
    }
}
exports.DisciplineService = DisciplineService;
