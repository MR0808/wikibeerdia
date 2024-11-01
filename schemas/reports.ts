import * as z from "zod";

export const ReportSchema = z.object({
    comment: z.string().min(1, {
        message: "Comment is required"
    }),
    type: z.enum(["BEER", "BREWERY", "BREWERYREVIEW", "BEERREVIEW"], {
        message: "Type is required"
    }),
    id: z.string().min(1, {
        message: "string is required"
    })
});
