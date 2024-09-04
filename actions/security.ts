'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import db from '@/lib/db';
import { EmailSchema, ResetPasswordSchema } from '@/schemas';
import { getUserById, getUserByEmail } from '@/data/user';
import { unstable_update as update } from '@/auth';
import { currentUser } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

export const updateEmail = async (values: z.infer<typeof EmailSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: 'Unauthorized' };
    }

    const validatedFields = EmailSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    values.email = values.email.toLowerCase();

    const existingUser = await getUserByEmail(values.email);

    if (existingUser) {
        return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
            emailVerified: null
        }
    });

    update({
        user: {
            email: updatedUser.email as string
        }
    });

    return { success: 'Email updated' };
};

export const updatePassword = async (
    values: z.infer<typeof ResetPasswordSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: 'Unauthorized' };
    }

    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            password: hashedPassword
        }
    });

    return { success: 'Password updated' };
};
