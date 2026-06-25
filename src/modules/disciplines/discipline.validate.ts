import z from "zod";

export const createDisciplineSchema = z
  .object({
    name: z.string().trim().min(1),
  })
  .strict();

export const updateDisciplineSchema = createDisciplineSchema.partial().strict();

export type CreateDisciplineDTO = z.infer<typeof createDisciplineSchema>;
export type UpdateDisciplineDTO = z.infer<typeof updateDisciplineSchema>;
