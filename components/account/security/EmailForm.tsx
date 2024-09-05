'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { SubmitButton } from '@/components/form/Buttons';
import { AccountFormInput } from '@/components/form/FormInput';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import { EmailSchema } from '@/schemas';
import { cn } from '@/lib/utils';
import { updateEmail } from '@/actions/security';

const EmailForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { data: newSession, update } = useSession();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
        }
    }, [newSession]);

    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: user?.email || ''
        }
    });

    const cancel = () => {
        form.reset();
        setEdit(!edit);
        setError(undefined);
        setSuccess(undefined);
    };

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        startTransition(() => {
            updateEmail(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }

                    if (data?.success) {
                        update();
                        form.reset(values);
                        setSuccess(
                            'Email successfully updated, you will need to verify this email though'
                        );
                        setError(undefined);
                        toast.success('Email successfully updated');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError('Something went wrong!');
                });
        });
    };

    return (
        <div className="flex flex-col gap-5 border-b border-b-gray-200 pb-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Email</h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit ? (
                <Form {...form}>
                    <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row gap-x-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {(success || error) && (
                            <div className="flex flex-row gap-x-6">
                                <div className="basis-full">
                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                </div>
                            </div>
                        )}
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={isPending} />
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className={`${
                        !user?.email && 'italic'
                    } text-base font-normal`}
                >
                    {user?.email ? `${user.email}` : 'Not specified'}
                </div>
            )}
        </div>
    );
};
export default EmailForm;
