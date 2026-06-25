import z from "zod";

export const createClassroomSchema = z
  .object({
    name: z.string().trim().min(1),
    semester: z.int().positive(),
    year: z.int().positive(),
    courseId: z.int().positive().optional(),
  })
  .strict();

export const updateClassroomSchema = createClassroomSchema
  .omit({
    year: true,
  })
  .partial()
  .strict();

export type CreateClassroomDTO = z.infer<typeof createClassroomSchema>;
export type UpdateClassroomDTO = z.infer<typeof updateClassroomSchema>;
