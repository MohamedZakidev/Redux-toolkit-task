import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title is too long"),
    body: z.string().min(20, "Body is must be at least 20 characters").max(300, "Body is too long"),
});
