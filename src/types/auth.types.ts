import z from "zod";
import { Request } from "express";

export const payloadSchema = z.object({
  userId: z.int(),
  role: z.enum(["STUDENT", "TEACHER", "DIRECTOR"]),
});

type Payload = z.infer<typeof payloadSchema>;

export interface AuthRequest extends Request {
  user?: Payload;
}
