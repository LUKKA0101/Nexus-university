// Externos
import bcrypt from "bcrypt";

// Internos
import prisma from "../../prisma/prisma";
import { LoginDTO } from "./auth.validate";
import { PasswordDTO } from "./auth.validate";
import { generateAccessToken } from "../../utils/jwt";

// Classe com métodos de autenticação
export class AuthService {
  // Define senha do usuário via token de convite (enviado por e-mail)
  // Token é invalidado após o uso
  async registerPassword(inviteToken: string, data: PasswordDTO) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    await prisma.user.update({
      where: { inviteToken: inviteToken },

      data: {
        password: passwordHash,
        inviteToken: null,
      },
    });
    return { message: "Senha definida com sucesso" };
  }

  // Realiza login validando e-mail e senha
  // Retorna token JWT de acesso (válido por 2h) em caso de sucesso
  async loginUser(dataUser: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: dataUser.email },
    });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    if (!user.password) {
      throw new Error(
        "Senha não definida pelo link, Por favor, entrar no link enviado para o seu email e definir uma senha",
      );
    }

    const verify = await bcrypt.compare(dataUser.password, user.password);

    if (!verify) {
      throw new Error("Credenciais inválidas");
    }

    const token = generateAccessToken(user.id, user.role);
    return token;
  }
}
