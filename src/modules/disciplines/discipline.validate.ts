import z from "zod";

export const disciplineSchema = z.object({
  name: z.string().trim().min(3),
});

export const disciplineSchemaUpdate = disciplineSchema.partial();

export type DisciplineDTO = z.infer<typeof disciplineSchema>;
export type DisciplineUpdateDTO = z.infer<typeof disciplineSchemaUpdate>;
