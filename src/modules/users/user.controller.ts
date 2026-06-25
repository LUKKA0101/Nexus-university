import { UserService } from "./user.service";
import {
  studentRegisterSchema,
  updateUserSchema,
  registerSchema,
} from "./user.validate";
import { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  // Method to register a new user
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataUser = registerSchema.parse(req.body);

      let dataStudent;

      // If the user is a student, parse the student-specific fields
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

  // Method to list all users
  getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.params.limit as string) || 10;

      const result = await this.userService.listAllUser(page, limit);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Method to get a user by ID
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.userService.listUserById(id);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Method to update a user by ID
  updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = updateUserSchema.parse(req.body);
      const result = await this.userService.updateUserById(id, data);
      res.status(200).json({
        message: "User updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Method to delete a user by ID
  deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.userService.deleteUserById(id);
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
