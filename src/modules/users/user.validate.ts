import z from "zod";

const role = z.enum(["STUDENT", "TEACHER", "DIRECTOR"]);

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres"),
  birthDate: z.coerce.date(),
  email: z.email("Email é obrigatório").trim(),
  role,
});

export const studentRegisterSchema = registerSchema.extend({
  registration: z
    .string()
    .trim()
    .regex(/^\d+$/, "Matrícula deve conter apenas números")
    .min(8, "A matrícula deve conter no mínimo 8 dígitos"),
  classroomId: z.number().positive("ID da classe é obrigatório"),
});

export const updateUserSchema = registerSchema
  .omit({ birthDate: true })
  .partial();

export type RegisterDTO = z.infer<typeof registerSchema>;
export type StudentRegisterDTO = z.infer<typeof studentRegisterSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
