"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import * as OTPAuth from "otpauth";
import { compare, hash } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect";

import db from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import getTwoFactorConfirmationByUserId from "@/data/twoFactorConfirmation";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, token, backupCode } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { error: "Email not verified. New confirmation email sent!" };
    }

    if (existingUser.otpEnabled && existingUser.email) {
        if (token) {
            let totp = new OTPAuth.TOTP({
                issuer: "Wikibeerdia",
                label: `${existingUser.firstName} ${existingUser.lastName}`,
                algorithm: "SHA1",
                digits: 6,
                secret: existingUser.otpBase32!
            });

            let delta = totp.validate({ token, window: 2 });

            if (delta === null) {
                return { error: "Invalid code!" };
            }

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });
        } else if (backupCode) {
            const codes = existingUser.otpBackups;

            let passed = false;
            let index = -1;
            for (let [i, code] of codes.entries()) {
                const doMatch = await compare(backupCode, code);

                if (doMatch) {
                    passed = true;
                    index = i;
                }
            }

            if (passed) {
                codes.splice(index, 1);
                await db.user.update({
                    where: { id: existingUser.id },
                    data: {
                        otpBackups: codes
                    }
                });
                const existingConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id);

                if (existingConfirmation) {
                    await db.twoFactorConfirmation.delete({
                        where: { id: existingConfirmation.id }
                    });
                }

                await db.twoFactorConfirmation.create({
                    data: {
                        userId: existingUser.id
                    }
                });
            } else {
                return { error: "Invalid backup code!" };
            }
        } else {
            return { twoFactor: true };
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (isRedirectError(error)) {
            return;
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
};

export default login;
