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
exports.AuthController = void 0;
const auth_validate_1 = require("./auth.validate");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dataUser = auth_validate_1.loginSchema.parse(req.body);
                const result = yield this.authService.loginUser(dataUser);
                res.status(200).json({
                    success: true,
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.setPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = auth_validate_1.passwordSchema.parse(req.body);
                const { token } = req.params;
                if (!token) {
                    res
                        .status(400)
                        .json({ success: false, error: "Token de convite ausente" });
                    return;
                }
                const result = yield this.authService.registerPassword(token, data);
                res.status(200).json({ success: true, message: result.message });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
