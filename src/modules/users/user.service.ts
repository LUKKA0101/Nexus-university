// Externos

// Internos
import prisma from "../../prisma/prisma";
import { transporter } from "../../../email";
import { RegisterDTO, StudentRegisterDTO } from "./user.validate";
import { generateInviteToken } from "../../utils/jwt";

export class UserService {
  // Registra novo usuário (estudantes precisam de dados adicionais)
  // Envia e-mail com token para definir senha após o registro
  async registerUser(dataUser: RegisterDTO, dataStudent?: StudentRegisterDTO) {
    const user = await prisma.user.create({
      data: {
        name: dataUser.name,
        age: dataUser.age,
        email: dataUser.email,
        role: dataUser.role,
        password: null,
        ...(dataUser.role === "STUDENT" && {
          student: {
            create: {
              registration: dataStudent!.registration,
              classroomId: dataStudent!.classroomId,
            },
          },
        }),
        ...(dataUser.role === "TEACHER" && {
          teacher: {
            create: {},
          },
        }),
        ...(dataUser.role === "DIRECTOR" && {
          director: {
            create: {},
          },
        }),
      },
      select: {
        id: true,
        name: true,
        age: true,
        email: true,
        role: true,
      },
    });

    const inviteToken = generateInviteToken(user.id); // Token para cadastro de senha

    await prisma.user.update({
      where: { id: user.id },
      data: { inviteToken },
    });

    await transporter(user.email, inviteToken);

    return { user };
  }

  async listAllUser() {
    const result = await prisma.user.findMany();
    return result;
  }
}
