import * as z from "zod";

export const ReviewSchema = z.object({
    rating: z.string().min(1, {
        message: "Comment is required"
    }),
    comment: z.string().min(1, {
        message: "Comment is required"
    }),
    id: z.string().min(1, {
        message: "Brewery is required"
    })
});

export const ReviewSchemaCreate = z.object({
    rating: z.coerce.number(),
    comment: z.string().min(1, {
        message: "Comment is required"
    }),
    id: z.string().min(1, {
        message: "Brewery is required"
    })
});
