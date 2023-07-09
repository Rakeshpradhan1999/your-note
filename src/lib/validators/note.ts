import { z } from "zod";

export const NoteValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(128, {
      message: "Title must be less than 128 characters long",
    }),
  content: z.any(),
});

export type NoteCreationRequest = z.infer<typeof NoteValidator>;
export type NoteUpdateRequest = {
  title: string;
  content: string;
  id: string;
};
