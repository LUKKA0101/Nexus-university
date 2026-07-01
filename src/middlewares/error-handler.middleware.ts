import { NextFunction, Response, Request } from "express";
import { Prisma } from "../generated/client";
import { ZodError } from "zod";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

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
        return res.status(404).json({
          message: "Relacionamento inválido",
        });

      default:
        return res.status(400).json({
          message: "Erro no banco de dados",
        });
    }
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: "Token expirado" });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const erroMap: Record<string, { status: number; message: string }> = {
    USER_NOT_FOUND: { status: 404, message: "Usuário não identificado" },
    TEACHER_NOT_FOUND: { status: 404, message: "Professor não identificado" },
    DISCIPLINE_NOT_FOUND: {
      status: 404,
      message: "Disciplina não identificada",
    },
    CLASSROOM_NOT_FOUND: { status: 404, message: "Turma não identificada" },
    COURSE_NOT_FOUND: { status: 404, message: "Curso não identificado" },
    STUDENT_NOT_FOUND: { status: 404, message: "Aluno não identificado" },
    COURSE_MODULE_NOT_FOUND: {
      status: 404,
      message: "Módulo não identificado",
    },
    LESSON_NOT_FOUND: { status: 404, message: "Aula não identificada" },
    CLASS_DISCIPLINE_NOT_FOUND: {
      status: 404,
      message: "Disciplina da turma não identificada",
    },
    PROGRESS_NOT_FOUND: { status: 404, message: "Progresso não identificado" },
    PROGRESS_ALREADY_COMPLETED: { status: 409, message: "Aula já concluída" },
    INVALID_CREDENTIALS: { status: 401, message: "Credenciais inválidas" },
    PASSWORD_NOT_SET: {
      status: 400,
      message:
        "Senha não definida. Acesse o link enviado por email para definir uma senha",
    },
    FORBIDDEN: { status: 403, message: "Você não tem acesso a essa rota" },
    EMAIL_SEND_FAILED: {
      status: 502,
      message: "Não foi possível enviar o email",
    },
  };

  const mapped = erroMap[err.message];

  if (mapped) {
    return res.status(mapped.status).json({ message: mapped.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Erro interno no servidor" });
}

export default errorHandler;
