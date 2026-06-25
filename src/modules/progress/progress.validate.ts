import z from "zod";

export const createProgressSchema = z
  .object({
    studentId: z.int().positive(),
    lessonId: z.int().positive(),
    classDisciplineId: z.int().positive(),
  })
  .strict();

export type CreateProgressDTO = z.infer<typeof createProgressSchema>;
