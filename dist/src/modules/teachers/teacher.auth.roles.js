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
exports.rolesById = rolesById;
const prisma_1 = __importDefault(require("../../lib/prisma"));
function rolesById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const id = Number(req.params.id);
        const teacher = yield prisma_1.default.teacher.findUnique({ where: { id } });
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.userId) !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
            return res.status(403).json({ err: "Esse e um texto teste" });
        }
    });
}
