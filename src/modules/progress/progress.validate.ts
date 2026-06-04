import z from "zod";

export const progressSchema = z.object({
  studentId: z.int().positive(),
  lessonId: z.int().positive(),
  classDisciplineId: z.int().positive(),
});

export type ProgressDTO = z.infer<typeof progressSchema>;
