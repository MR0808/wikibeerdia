import * as z from "zod";

export const BlogVoteSchema = z.object({
    vote: z.string().min(1, {
        message: "Rating is required"
    })
});
