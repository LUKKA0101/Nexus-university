import z from "zod";

export const courseModuleSchema = z.object({
  title: z.string().trim().min(3),
  disciplineId: z.int().positive(),
});

export const courseModuleUpdateSchema = courseModuleSchema.partial();

export type ModuleDTO = z.infer<typeof courseModuleSchema>;
export type ModuleUpdateDTO = z.infer<typeof courseModuleUpdateSchema>;
