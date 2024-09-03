'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { CheckSubmitButton, SubmitButton } from '@/components/form/Buttons';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AccountFormInput } from '@/components/form/FormInput';
import FormError from '@/components/form/FormError';
import { DisplayNameSchema } from '@/schemas';
import { cn } from '@/lib/utils';
import { updateDisplayName } from '@/actions/personalInfo';
import { checkDisplayName } from '@/data/user';

const DisplayNameForm = () => {
    const user = useCurrentUser();
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [displayNameAvailable, setDisplayNameAvailable] = useState(false);
    const { update } = useSession();
    const [isPendingForm, startTransitionForm] = useTransition();
    const [isPendingCheck, startTransitionCheck] = useTransition();

    const errorClass = 'pl-6';

    const form = useForm<z.infer<typeof DisplayNameSchema>>({
        resolver: zodResolver(DisplayNameSchema),
        defaultValues: {
            displayName: user?.displayName || ''
        }
    });

    const cancel = () => {
        form.reset();
        setEdit(!edit);
    };

    const onCheckDisplayName = (values: z.infer<typeof DisplayNameSchema>) => {
        startTransitionCheck(() => {
            if (user?.displayName !== values.displayName)
                checkDisplayName(values.displayName)
                    .then((data) => {
                        console.log(data)
                        data ? setDisplayNameAvailable(true) : setDisplayNameAvailable(false)
                        if (!data) {
                                     setError(data.error);
                                 }
                })
                .catch(() => setError('Something went wrong!'));
        })
    }

    const onSubmit = (values: z.infer<typeof DisplayNameSchema>) => {
        startTransitionForm(() => {
            updateDisplayName(values)
                // .then((data) => {
                //     if (data?.error) {
                //         setError(data.error);
                //     }

                //     if (data?.success) {
                //         setEdit(false);
                //         update();
                //         form.reset(values);
                //         toast.success('Name successfully updated');
                //     }
                // })
                // .catch(() => setError('Something went wrong!'));
        });
    };

    return (
        <div className="flex flex-col gap-5 border-b border-b-gray-200 pb-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Display Name</h3>
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
                        <div className="flex flex-row gap-x-6">
                            <div className='basis-3/4'>
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="displayName"
                                                type="text"
                                                placeholder="Display Name"
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className='basis-1/4' onClick={() => onCheckDisplayName(form.getValues())}>
                            <CheckSubmitButton isPending={isPendingCheck} disabledCheck={displayNameAvailable} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={isPendingForm} disabledCheck={displayNameAvailable} />
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className={`${
                        !user?.displayName && 'italic'
                    } text-base font-normal`}
                >
                    {user?.firstName && user?.lastName
                        ? `${user.displayName}`
                        : 'Not specified'}
                </div>
            )}
        </div>
    );
};
export default DisplayNameForm;
