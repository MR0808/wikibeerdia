'use server';

import * as z from 'zod';

import db from '@/lib/db';
import { NameSchema } from '@/schemas';
import { getUserById } from '@/data/user';
import { unstable_update as update } from '@/auth';
import { currentUser } from '@/lib/auth';

export const updateName = async (values: z.infer<typeof NameSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: 'Unauthorized' };
    }

    const validatedFields = NameSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    update({
        user: {
            firstName: updatedUser.firstName as string,
            lastName: updatedUser.lastName as string
        }
    });

    return { success: 'Name updated' };
};
