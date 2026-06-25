import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import { LoginDTO } from "./auth.validate";
import { PasswordDTO } from "./auth.validate";
import { generateAccessToken } from "../../utils/jwt";

export class AuthService {
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

  async loginUser(dataUser: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: dataUser.email },
    });

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    if (!user.password) {
      throw new Error("PASSWORD_NOT_SET");
    }

    const verify = await bcrypt.compare(dataUser.password, user.password);

    if (!verify) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const token = generateAccessToken(user.id, user.role);
    return token;
  }
}
