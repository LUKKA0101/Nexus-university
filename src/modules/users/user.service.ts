import prisma from "../../lib/prisma";
//import { transporter } from "../../infra/email";
import {
  RegisterDTO,
  StudentRegisterDTO,
  UpdateUserDTO,
} from "./user.validate";
import { generateInviteToken } from "../../utils/jwt";
import { transporter } from "../../infra/email";

const userSelect = {
  id: true,
  name: true,
  email: true,
  birthDate: true,
  role: true,
  createdAt: true,
} as const;
export class UserService {
  // Method to register user
  async registerUser(dataUser: RegisterDTO, dataStudent?: StudentRegisterDTO) {
    return await prisma.$transaction(async (tx) => {
      const birthDateAsDate = new Date(dataUser.birthDate);
      const user = await tx.user.create({
        data: {
          name: dataUser.name,
          birthDate: birthDateAsDate,
          email: dataUser.email,
          role: dataUser.role,
          password: null,
          //Creates a specific profile according to the user's role.
          ...(dataUser.role === "STUDENT" && {
            student: {
              create: {
                registration: dataStudent!.registration,
                classroomId: dataStudent!.classroomId,
              },
            },
          }),
          //Teacher has no additional data beyond the link to the user.
          ...(dataUser.role === "TEACHER" && { teacher: { create: {} } }),
          //The director has no additional data beyond the link to the user.
          ...(dataUser.role === "DIRECTOR" && { director: { create: {} } }),
        },
        select: userSelect,
      });

      // Generate invite token for password registration
      const inviteToken = generateInviteToken(user.id);

      // Save the token to the user record
      await tx.user.update({
        where: { id: user.id },
        data: { inviteToken },
      });

      try {
        await transporter(user.email, inviteToken);
      } catch {
        throw new Error("EMAIL_SEND_FAILED");
      }

      return { user };
    });
  }

  // Method to list all users
  async listAllUser(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [total, data] = await prisma.$transaction([
      prisma.user.count(),

      prisma.user.findMany({
        skip,
        take: limit,
        select: userSelect,
      }),
    ]);
    return {
      data: data.map((user) => ({
        ...user,
        birthDate: user.birthDate.toISOString().split("T")[0],
        createdAt: user.createdAt.toISOString().split("T")[0],
      })),
      meta: {
        total,
      },
    };
  }

  // Method to list only one user via ID
  async listUserById(id: number) {
    const result = await prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
    if (!result) throw new Error("USER_NOT_FOUND");
    return {
      ...result,
      birthDate: result.birthDate.toISOString().split("T")[0],
      createdAt: result.createdAt.toISOString().split("T")[0],
    };
  }

  //Method to update user
  async updateUserById(id: number, data: UpdateUserDTO) {
    const result = await prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });

    return {
      ...result,
      birthDate: result.birthDate.toISOString().split("T")[0],
      createdAt: result.createdAt.toISOString().split("T")[0],
    };
  }

  //method to delete user
  async deleteUserById(id: number) {
    await prisma.user.delete({ where: { id } });
  }
}
