import z from "zod";

const role = z.enum(["STUDENT", "TEACHER", "DIRECTOR"]);

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres"),
  age: z
    .number()
    .int()
    .min(1, "Idade deve ser maior que 0")
    .max(120, "Idade parece irreal"),
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

export type RegisterDTO = z.infer<typeof registerSchema>;
export type StudentRegisterDTO = z.infer<typeof studentRegisterSchema>;
