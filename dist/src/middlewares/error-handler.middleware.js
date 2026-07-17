"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/client");
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: err.issues,
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(401).json({ message: "Token expirado" });
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        return res.status(401).json({ message: "Token inválido" });
    }
    const erroMap = {
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
        TOKEN_MISSING: { status: 401, message: "Token não fornecido" },
        PASSWORD_NOT_SET: {
            status: 400,
            message: "Senha não definida. Acesse o link enviado por email para definir uma senha",
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
exports.default = errorHandler;
