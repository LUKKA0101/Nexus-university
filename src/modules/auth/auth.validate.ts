import z from "zod";

export const loginSchema = z.object({
  email: z.email("Email é obrigatório").trim(),
  password: z.string().min(6, "Senha obrigatória").trim(),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "A senha deve conter maiúscula, minúscula, número e caractere especial",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordDTO = z.infer<typeof passwordSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
