"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.generateInviteToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não definida no .env");
}
const generateInviteToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};
exports.generateInviteToken = generateInviteToken;
const generateAccessToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId, role }, SECRET_KEY, { expiresIn: "2h" });
};
exports.generateAccessToken = generateAccessToken;
