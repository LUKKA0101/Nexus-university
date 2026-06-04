import z from "zod";

export const lessonSchema = z.object({
  title: z.string().trim().min(3),
  videoUrl: z.string().url().optional(),
  moduleId: z.int().positive(),
});

export const lessonUpdateSchema = lessonSchema.partial();

export type LessonDTO = z.infer<typeof lessonSchema>;
export type LessonUpdateDTO = z.infer<typeof lessonUpdateSchema>;
