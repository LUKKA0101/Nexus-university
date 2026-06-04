import z from "zod";

export const classroomSchema = z.object({
  name: z.string().trim().min(3),
  semester: z.int().min(1).max(2),
  year: z.int().min(2000).max(2100),
  courseId: z.int().positive().optional(),
});

export const classroomUpdateSchema = classroomSchema
  .omit({ year: true, courseId: true })
  .partial();

export type ClassUpdateDTO = z.infer<typeof classroomUpdateSchema>;
export type ClassDTO = z.infer<typeof classroomSchema>;
