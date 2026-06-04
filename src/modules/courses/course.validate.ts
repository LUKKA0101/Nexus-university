import z from "zod";

export const courseSchema = z.object({
  name: z.string().trim().min(3),
});

export const courseSchemaUpdate = courseSchema.partial();

export type courseDTO = z.infer<typeof courseSchema>;
export type courseUpdateDTO = z.infer<typeof courseSchemaUpdate>;
