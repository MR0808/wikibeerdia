'use server';

import prisma from '@/utils/db';
import {
    getErrorRedirect,
    getSuccessRedirect,
    parseFormData
} from '@cgambrell/utils';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/lib/auth';
import {
    loginSchema,
    registerSchema,
    verifyEmailSchema
} from '@/validators/auth';
import { BuiltInProviderType } from 'next-auth/providers';

export async function register(_prevState: any, formData: FormData) {
    const { data, errors } = parseFormData(formData, registerSchema);
    if (errors) return { errors };

    try {
        const passwordHash = await bcrypt.hash(data.password, 10);
        await prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                passwordHash
            }
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        )
            return {
                errors: { email: ['User already exists with that email'] }
            };
        else if (error instanceof AuthError)
            redirect(getErrorRedirect('/register', error.cause?.err?.message));
        throw error;
    }

    redirect(getSuccessRedirect('/login', 'Account created, please login'));
}

export async function login(_prevState: any, formData: FormData) {
    const { data, errors } = parseFormData(formData, loginSchema);
    if (errors) return { errors };
    const redirectUrl = data.callbackUrl ? data.callbackUrl : '/';

    try {
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirectTo: redirectUrl
        });
    } catch (error) {
        if (error instanceof AuthError) {
            redirect(getErrorRedirect('/login', error.cause?.err?.message));
        }
        throw error;
    }
}

export async function logout() {
    await signOut({ redirectTo: '/login' });
}

export async function oauth(provider: BuiltInProviderType) {
    try {
        await signIn(provider, { redirectTo: '/' });
    } catch (error) {
        if (error instanceof AuthError)
            redirect(getErrorRedirect('/login', error.cause?.err?.message));
        throw error;
    }
}

export async function verifyEmail(_prevState: any, formData: FormData) {
    const { data, errors } = parseFormData(formData, verifyEmailSchema);
    if (errors) return { errors };

    try {
        await signIn('resend', { email: data.email, redirect: false });
    } catch (error) {
        if (error instanceof AuthError)
            redirect(getErrorRedirect('/forgot', error.cause?.err?.message));
        throw error;
    }

    redirect(
        getSuccessRedirect(
            '/login',
            'A sign in link has been sent to your email address.'
        )
    );
}
