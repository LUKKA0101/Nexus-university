import z from "zod";

export const updateTeacherSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.email().optional(),
    birthDate: z.date().optional(),
  })
  .strict();

export type UpdateTeacherDTO = z.infer<typeof updateTeacherSchema>;
