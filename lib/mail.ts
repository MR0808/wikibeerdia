"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/verification?token=${token}`;

    await resend.emails.send({
        from: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/newpassword?token=${token}`;

    await resend.emails.send({
        from: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    });
};

export const sendContactEmail = async (details: {
    name: string;
    email: string;
    message: string;
}) => {
    await resend.emails.send({
        from: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        to: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        subject: `Contact from website - ${details.name}`,
        html: `<p><ul><li>Name - ${details.name}</li><li>Email - ${details.email}</li><li>Message - ${details.message}</li></ul></p>`
    });
};
