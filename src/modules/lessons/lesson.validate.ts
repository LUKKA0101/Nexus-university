import z from "zod";

export const createLessonSchema = z
  .object({
    title: z.string().trim().min(1),
    videoUrl: z.url().optional(),
    moduleId: z.int().positive(),
  })
  .strict();

export const updateLessonSchema = createLessonSchema.partial().strict();

export type CreateLessonDTO = z.infer<typeof createLessonSchema>;
export type UpdateLessonDTO = z.infer<typeof updateLessonSchema>;
