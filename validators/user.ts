import { z } from 'zod';

export const updateUserSchema = z.object({
    id: z
        .string({ required_error: 'User ID is required' })
        .cuid({ message: 'Invalid CUID' }),
    firstName: z.string().transform((arg) => (!arg.trim() ? null : arg)),
    lastName: z.string().transform((arg) => (!arg.trim() ? null : arg))
});
