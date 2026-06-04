import { NextFunction, Response, Request } from "express";
import { Prisma } from "../generated/client";
import { ZodError } from "zod";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: err.issues,
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          message: "Registro já existe",
        });

      case "P2025":
        return res.status(404).json({
          message: "Registro não encontrado",
        });

      case "P2003":
        return res.status(400).json({
          message: "Relacionamento inválido",
        });

      default:
        return res.status(400).json({
          message: "Erro no banco de dados",
        });
    }
  }

  console.error(err);
  return res.status(500).json({ message: "Erro interno no servidor" });
}
export default errorHandler;
