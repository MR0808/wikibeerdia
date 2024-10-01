"use server";

import * as z from "zod";
import { hash } from "bcrypt-ts";

import db from "@/lib/db";
import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail, generateDisplayName } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    let { firstName, lastName, email, password } = validatedFields.data;
    email = email.toLocaleLowerCase();
    const displayName = await generateDisplayName();
    const hashedPassword = await hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await db.user.create({
        data: {
            firstName,
            lastName,
            email,
            displayName,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    return {
        success: "Registration successful, please check your email to verify."
    };
};

export default register;
