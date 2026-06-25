import z from "zod";

export const updateStudentSchema = z
  .object({
    registration: z
      .string()
      .trim()
      .regex(/^\d+$/, "Registration must contain only numbers")
      .min(8, "Registration must have at least 8 digits")
      .optional(),
    classroomId: z.int().positive().optional(),
  })
  .strict();

export type UpdateStudentDTO = z.infer<typeof updateStudentSchema>;
