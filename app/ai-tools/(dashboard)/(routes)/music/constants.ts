import { z } from "zod";

export const musicFormSchema = z.object({
    prompt: z.string().min(1, { message: "Prompt is required"})
});