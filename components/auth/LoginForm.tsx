'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import FormError from '@/components/form/FormError';
import {
    FormInputAuth,
    PasswordInputAuth
} from '@/components/form/FormInputAuth';
import { AuthSubmitButton } from '@/components/form/Buttons';
import { LoginSchema } from '@/schemas';
import login from '@/actions/login';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Email already in use with different provider!'
            : '';

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const errorClass = 'pl-6';

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: true
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');
        console.log(values);

        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch(() => setError('Something went wrong'));
        });
    };

    return (
        <Form {...form}>
            <FormError message={error || urlError} />
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <input type="hidden" name="callbackUrl" value="placeholder" />
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
                <div className="flex items-center justify-between">
                    {/* <div className="flex items-center">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                name="rememberMe"
                                                id="rememberMe"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <label
                                                htmlFor="rememberMe"
                                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                                            >
                                                Remember Me
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage className={errorClass} />
                                </FormItem>
                            )}
                        />
                    </div> */}
                    &nbsp;
                    <div className="text-sm">
                        <Link
                            href="/forgot"
                            className="text-indigo-400 hover:text-blue-500"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <div>
                    <AuthSubmitButton text="Login" isPending={isPending} />
                </div>
            </form>
        </Form>
    );
};
export default LoginForm;
