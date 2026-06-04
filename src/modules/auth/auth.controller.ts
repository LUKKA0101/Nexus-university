import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { passwordSchema, loginSchema } from "./auth.validate";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataUser = loginSchema.parse(req.body);
      const result = await this.authService.loginUser(dataUser);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  setPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = passwordSchema.parse(req.body);
      const { token } = req.params as { token: string };
      if (!token) {
        res
          .status(400)
          .json({ success: false, error: "Token de convite ausente" });
        return;
      }
      const result = await this.authService.registerPassword(token, data);
      res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  };
}
