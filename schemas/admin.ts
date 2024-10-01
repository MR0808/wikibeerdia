import * as z from "zod";

export const BreweryTypeSchema = z.object({
    name: z.string().min(1, {
        message: "Brewery type is required",
    }),
    status: z.enum(["DRAFT", "PENDING", "APPROVED"], {
        message: "Status is required",
    }),
});
