'use server';

import * as z from 'zod';

import db from '@/lib/db';
import { NameSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export const updateName = async (
    values: z.infer<typeof NameSchema>,
    email: string
) => {
    const validatedFields = NameSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { firstName, lastName } = validatedFields.data;

    const existingUser = await getUserByEmail(email!);

    if (!existingUser) {
        return { error: 'User does not exist!' };
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            firstName,
            lastName
        }
    });

    return { success: 'Name updated' };
};
