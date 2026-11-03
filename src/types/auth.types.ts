import { Request } from "express";
import z from "zod";

export const payloadSchema = z.object({
  userId: z.int(),
  role: z.enum(["STUDENT", "TEACHER", "DIRECTOR"]),
});

type Payload = z.infer<typeof payloadSchema>;

export interface AuthRequest extends Request {
  user?: Payload;
}
