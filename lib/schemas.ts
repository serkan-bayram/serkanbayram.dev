import { z } from "zod";

export const WorkSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),

  // TODO: If we can fix undefined | null on backend we can omit this
  link: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? undefined),
  imageSource: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? undefined),
  status: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? undefined),

  repoLinks: z.array(z.string()),
});

export type WorkItem = z.infer<typeof WorkSchema>;
