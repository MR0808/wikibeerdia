'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';
import { toast } from 'react-toastify';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { SubmitButton } from '@/components/form/Buttons';
import { UserProps } from '@/utils/types';
import { AccountFormInput } from '@/components/form/FormInput';
import FormError from '@/components/form/FormError';
import { NameSchema } from '@/schemas';
import { cn } from '@/lib/utils';
import { updateName } from '@/actions/personalInfo';

const NameForm = ({ user }: UserProps) => {
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const errorClass = 'pl-6';
    const userEmail = user?.email!;

    const form = useForm<z.infer<typeof NameSchema>>({
        resolver: zodResolver(NameSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || ''
        }
    });

    const cancel = () => {
        setEdit(!edit);
        form.reset();
    };

    const onSubmit = (values: z.infer<typeof NameSchema>) => {
        setError('');

        startTransition(() => {
            updateName(values, userEmail).then((data) => {
                console.log('data - ' + data);

                if (data?.error) {
                    setError(data.error);
                }

                if (data?.success) {
                    form.reset();
                    setEdit(false);
                    toast.success('Name successfully updated');
                }
            });
        });
    };

    return (
        <div className="flex flex-col gap-5 border-b border-b-gray-200 pb-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Name</h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit ? (
                <Form {...form}>
                    <FormError message={error} />
                    <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <input
                            type="hidden"
                            name="userEmail"
                            value={user?.email!}
                        />
                        <div className="flex flex-row gap-x-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="firstName"
                                                type="text"
                                                placeholder="First Name"
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="lastName"
                                                type="text"
                                                placeholder="Last Name"
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={isPending} />
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className={`${
                        !user?.firstName && 'italic'
                    } text-base font-normal`}
                >
                    {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : 'Not specified'}
                </div>
            )}
        </div>
    );
};
export default NameForm;
