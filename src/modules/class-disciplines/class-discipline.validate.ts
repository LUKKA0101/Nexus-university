import z from "zod";

export const classDisciplineSchema = z.object({
  classroomId: z.int().positive(),
  disciplineId: z.int().positive(),
  teacherId: z.int().positive(),
});

export const classDisciplineSchemaUpdate = classDisciplineSchema.partial();

export type ClassDisciplineDTO = z.infer<typeof classDisciplineSchema>;
export type ClassDisciplineUpdateDTO = z.infer<
  typeof classDisciplineSchemaUpdate
>;
