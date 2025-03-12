import { z } from "zod";

export const workSchema = z.object({
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

export type WorkItem = z.infer<typeof workSchema>;

export const saveWorkSchema = z.object({
  workName: z.string(),
  workLink: z.string().url("Invalid URL"),
  workDescription: z.string(),
  workImage: z.string(),
  workStatus: z.string(),
  workRepos: z.array(z.string().url("Invalid URL")),
});

export type SaveWork = z.infer<typeof saveWorkSchema>;
