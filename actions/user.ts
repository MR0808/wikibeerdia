'use server';

import prisma from '@/utils/db';
import { updateUserSchema } from '@/validators/user';
import {
    getErrorRedirect,
    getSuccessRedirect,
    parseFormData
} from '@cgambrell/utils';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUser(_prevState: any, formData: FormData) {
    const { data, errors } = parseFormData(formData, updateUserSchema);
    if (errors) return { errors };

    try {
        await prisma.user.update({
            where: { id: data.id },
            data: { firstName: data.firstName, lastName: data.lastName }
        });
    } catch (error) {
        if (error instanceof AuthError)
            redirect(getErrorRedirect('/', error.cause?.err?.message));
        throw error;
    }

    revalidatePath('/');
    redirect(getSuccessRedirect('/', 'User updated successfully'));
}
