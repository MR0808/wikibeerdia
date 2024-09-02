'use server';

import * as z from 'zod';
import { add } from 'date-fns';

import db from '@/lib/db';
import { NameSchema, GenderSchema, LocationSchema, DateOfBirthSchema } from '@/schemas';
import { getUserById } from '@/data/user';
import { unstable_update as update } from '@/auth';
import { currentUser } from '@/lib/auth';
import { State } from '@prisma/client';

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

    const validatedFields = LocationSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let state: State | undefined;
    let stateDb: number | null | undefined;

    if (values.state === -1) {
        state = undefined;
        stateDb = null;
    } else {
        const tempState = await db.state.findFirst({
            where: { id: values.state }
        });
        state = tempState ? tempState : undefined;
        stateDb = values.state;
    }

    console.log(values);
    await db.user.update({
        where: { id: dbUser.id },
        data: {
            countryId: values.country,
            stateId: stateDb
        }
    });

    const country = await db.country.findFirst({
        where: { id: values.country }
    });

    return { success: 'Location updated', country, state };
};

export const updateDateOfBirth = async (values: z.infer<typeof DateOfBirthSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: 'Unauthorized' };
    }

    const validatedFields = DateOfBirthSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }
    values.dateOfBirth = add(values.dateOfBirth, {days: 1})

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    return { success: 'Date of birth updated' };
};