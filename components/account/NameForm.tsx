'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { SubmitButton } from '@/components/form/Buttons';
import { UserProps } from '@/utils/types';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import FormError from '@/components/form/FormError';
import { NameSchema } from '@/schemas';

const NameForm = ({ user }: UserProps) => {
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const errorClass = 'pl-6';

    const form = useForm<z.infer<typeof NameSchema>>({
        resolver: zodResolver(NameSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || ''
        }
    });

    return (
        <div className="flex flex-col gap-5 border-b border-b-gray-200 pb-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Name</h3>
                <div
                    className="cursor-pointer text-base font-normal"
                    onClick={() => setEdit(!edit)}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit ? (
                <Form {...form}>
                    <FormError message={error} />
                    <form className="space-y-6">
                        <div className="flex flex-row gap-x-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                name="firstName"
                                                type="text"
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
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                name="lastName"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={false} />
                        </div>
                    </form>
                </Form>
            ) : (
                <div className="italic text-base font-normal">
                    Not specified
                </div>
            )}
        </div>
    );
};
export default NameForm;
