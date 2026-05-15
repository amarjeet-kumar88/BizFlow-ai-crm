import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string(),

  phone: z.string(),

  email: z.string().optional(),

  source: z.string().optional(),
});
