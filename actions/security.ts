"use server";

import * as z from "zod";
import { hash } from "bcrypt-ts";

import db from "@/lib/db";
import { EmailSchema, ResetPasswordSchema } from "@/schemas/auth";
import { TwoFactorProps } from "@/utils/types";
import { getUserById, getUserByEmail } from "@/data/user";
import { unstable_update as update } from "@/auth";
import { currentUser } from "@/lib/auth";
import { checkAuth } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken, generateRecoveryCodes } from "@/lib/tokens";

export const updateEmail = async (values: z.infer<typeof EmailSchema>) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    const validatedFields = EmailSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    values.email = values.email.toLowerCase();

    const existingUser = await getUserByEmail(values.email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    const updatedUser = await db.user.update({
        where: { id: user.id },
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

    return { success: "Email updated" };
};

export const updatePassword = async (
    values: z.infer<typeof ResetPasswordSchema>
) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { password } = validatedFields.data;

    const hashedPassword = await hash(password, 10);

    await db.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword
        }
    });

    return { success: "Password updated" };
};

export const setupTwoFactor = async ({
    otpAuthUrl,
    otpBase32,
    otpBackups
}: TwoFactorProps) => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    await db.user.update({
        where: { id: user.id },
        data: {
            otpEnabled: true,
            otpVerified: true,
            otpBase32,
            otpAuthUrl,
            otpBackups
        }
    });

    update({
        user: {
            otpEnabled: true
        }
    });

    return { success: "Two factor updated" };
};

export const disableTwoFactor = async () => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    await db.user.update({
        where: { id: user.id },
        data: {
            otpEnabled: false,
            otpVerified: false,
            otpBase32: null,
            otpAuthUrl: null,
            otpBackups: []
        }
    });

    update({
        user: {
            otpEnabled: false
        }
    });
    return { success: "Two factor disabled" };
};

export const resetBackupCodes = async () => {
    const user = await checkAuth();

    if (!user)
        return {
            data: null,
            error: "Unauthorized"
        };

    const { recoveryCodes, recoveryCodesHashed } =
        await generateRecoveryCodes();

    await db.user.update({
        where: { id: user.id },
        data: {
            otpBackups: recoveryCodesHashed
        }
    });

    return { recoveryCodes };
};
