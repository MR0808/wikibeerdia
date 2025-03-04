import * as z from "zod";

export const ContactSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    message: z.string().min(1, {
        message: "Message is required"
    }),
    email: z.string().email({ message: "Invalid email address" })
});
