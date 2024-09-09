'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { EmailSchema } from '@/schemas/auth';
import AuthWrapper from './AuthWrapper';
import { FormInputAuth } from '@/components/form/FormInputAuth';
import { AuthSubmitButton } from '@/components/form/Buttons';
import { resetPassword } from '@/actions/resetPassword';
import FormError from '@/components/form/FormError';
import FormSuccess from '../form/FormSuccess';

const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: ''
        }
    });
    const errorClass = 'pl-6';

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            resetPassword(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormInputAuth
                                                {...field}
                                                label="Email"
                                                name="email"
                                                type="text"
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
                                text="Login"
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
