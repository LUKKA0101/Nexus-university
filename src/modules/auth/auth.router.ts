import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const authRouter = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.put("/register-password/:token", authController.setPassword);
authRouter.post("/login", authController.login);
