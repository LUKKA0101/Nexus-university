import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

export const userRouter = Router();

const authService = new UserService();
const authController = new UserController(authService);

userRouter.post("/register", authController.register);
userRouter.get("/list", authController.getAllUser);
