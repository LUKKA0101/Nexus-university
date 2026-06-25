import z from "zod";

export const createCourseModuleSchema = z
  .object({
    title: z.string().trim().min(1),
    disciplineId: z.int().positive(),
  })
  .strict();

export const updateCourseModuleSchema = createCourseModuleSchema
  .partial()
  .strict();

export type CreateCourseModuleDTO = z.infer<typeof createCourseModuleSchema>;
export type UpdateCourseModuleDTO = z.infer<typeof updateCourseModuleSchema>;
