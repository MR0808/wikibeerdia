import { z } from "zod";

export function validateWithZodSchema<T>(
    schema: z.ZodType<T>,
    data: unknown
): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw result.error; // best: keeps ZodError details
    }

    return result.data;
}
