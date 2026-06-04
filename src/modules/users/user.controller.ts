import { UserService } from "./user.service";
import { registerSchema } from "./user.validate";
import { studentRegisterSchema } from "./user.validate";
import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataUser = registerSchema.parse(req.body);

      let dataStudent;

      if (dataUser.role === "STUDENT") {
        dataStudent = studentRegisterSchema.parse(req.body);
      }
      const result = await this.userService.registerUser(dataUser, dataStudent);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.listAllUser();
      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  };
}
