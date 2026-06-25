import z from "zod";

export const createClassDisciplineSchema = z
  .object({
    classroomId: z.int().positive(),
    disciplineId: z.int().positive(),
    teacherId: z.int().positive(),
  })
  .strict();

export const updateClassDisciplineSchema = createClassDisciplineSchema
  .omit({
    classroomId: true,
    teacherId: true,
  })
  .partial()
  .strict();

export type CreateClassDisciplineDTO = z.infer<
  typeof createClassDisciplineSchema
>;
export type UpdateClassDisciplineDTO = z.infer<
  typeof updateClassDisciplineSchema
>;
