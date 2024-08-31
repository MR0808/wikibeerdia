'use server';

import * as z from 'zod';

import db from '@/lib/db';
import { NameSchema, GenderSchema, LocationSchema } from '@/schemas';
import { getUserById } from '@/data/user';
import { unstable_update as update } from '@/auth';
import { currentUser } from '@/lib/auth';
import { Gender, State } from '@prisma/client';

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

export const updateGender = async (values: z.infer<typeof GenderSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: 'Unauthorized' };
    }

    const validatedFields = GenderSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    return { success: 'Gender updated' };
};

export const updateLocation = async (
    values: z.infer<typeof LocationSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: 'Unauthorized' };
    }

    const validatedFields = GenderSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let state: State | undefined;

    if (values.state === -1) {
        values = { country: values.country, state: undefined };
        state = undefined;
    } else {
        const tempState = await db.state.findFirst({
            where: { id: values.state }
        });
        state = tempState ? tempState : undefined;
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    const country = await db.country.findFirst({
        where: { id: values.country }
    });

    return { success: 'Location updated', country, state };
};
