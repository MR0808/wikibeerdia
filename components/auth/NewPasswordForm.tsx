'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { ResetPasswordSchema } from '@/schemas/auth';
import AuthWrapper from './AuthWrapper';
import { PasswordInputAuth } from '@/components/form/FormInputAuth';
import { AuthSubmitButton } from '@/components/form/Buttons';
import { updatePassword } from '@/actions/resetPassword';
import FormError from '@/components/form/FormError';
import FormSuccess from '../form/FormSuccess';

const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });
    const errorClass = 'pl-6';

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            updatePassword(values, token).then((data) => {
                setError(data?.error);
                setSuccess(
                    data?.success
                        ? 'Your password has been updated.'
                        : undefined
                );
            });
        });
    };

    return (
        <AuthWrapper
            paragraph="We've all done it, a few too many beers, and forgotten our password. That's fine, we don't care, just use this page to get it back and start again."
            heading="Forgotten your password?"
            subHeading="Use the form below to reset it"
            backButtonString="Remember your password?"
            backButtonHref="/login"
            backButtonLabel="Login"
        >
            {success ? (
                <FormSuccess message={success} />
            ) : (
                <Form {...form}>
                    <FormError message={error} />
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="relative">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <PasswordInputAuth
                                                {...field}
                                                label="Password"
                                                name="password"
                                                type="password"
                                                defaultValue=""
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="relative">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <PasswordInputAuth
                                                {...field}
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                type="password"
                                                defaultValue=""
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <AuthSubmitButton
                                text="Reset"
                                isPending={isPending}
                            />
                        </div>
                    </form>
                </Form>
            )}
        </AuthWrapper>
    );
};
export default NewPasswordForm;
