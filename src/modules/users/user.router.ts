import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authMiddlewareRoles } from "../../middlewares/role-auth.middleware";

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.use(authMiddleware, authMiddlewareRoles("DIRECTOR"));

userRouter.post("/", userController.register);
userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;
