import { z } from "zod";

export const createCourseSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict();

export const updateCourseSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict();

export type CreateCourseDTO = z.infer<typeof createCourseSchema>;
export type UpdateCourseDTO = z.infer<typeof updateCourseSchema>;
