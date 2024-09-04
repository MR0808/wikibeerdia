'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { SubmitButton } from '@/components/form/Buttons';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AccountFormInput } from '@/components/form/FormInput';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import { DisplayNameSchema } from '@/schemas';
import { cn } from '@/lib/utils';
import { updateDisplayName } from '@/actions/personalInfo';
import { checkDisplayName } from '@/data/user';

const DisplayNameForm = () => {
    const user = useCurrentUser();
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
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
        setDisplayNameAvailable(false);
        setError(undefined);
        setSuccess(undefined);
    };

    const clearForm = () => {
        setDisplayNameAvailable(false);
        setError(undefined);
        setSuccess(undefined);
    };

    const onCheckDisplayName = (values: z.infer<typeof DisplayNameSchema>) => {
        startTransitionCheck(() => {
            if (user?.displayName !== values.displayName) {
                checkDisplayName(values.displayName)
                    .then((data) => {
                        console.log(data);
                        data
                            ? setDisplayNameAvailable(true)
                            : setDisplayNameAvailable(false);
                        if (data === false) {
                            setError('Username not available');
                            setSuccess(undefined);
                        } else {
                            setSuccess('Username is available');
                            setError(undefined);
                        }
                    })
                    .catch(() => setError('Something went wrong!'));
            } else {
                setDisplayNameAvailable(true);
                setSuccess('Username is available');
                setError(undefined);
            }
        });
    };

    const onSubmit = (values: z.infer<typeof DisplayNameSchema>) => {
        startTransitionForm(() => {
            updateDisplayName(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }

                    if (data?.success) {
                        setEdit(false);
                        update();
                        form.reset(values);
                        setDisplayNameAvailable(false);
                        setError(undefined);
                        setSuccess(undefined);
                        toast.success('Name successfully updated');
                    }
                })
                .catch(() => setError('Something went wrong!'));
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
                    <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row gap-x-6">
                            <div className="basis-3/4">
                                <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem className={cn('w-full')}>
                                            <FormControl onChange={clearForm}>
                                                <AccountFormInput
                                                    {...field}
                                                    name="displayName"
                                                    type="text"
                                                    placeholder="Display Name"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="basis-1/4">
                                <Button
                                    type="button"
                                    disabled={
                                        isPendingCheck || displayNameAvailable
                                    }
                                    className={cn('capitalize w-full h-12')}
                                    onClick={() =>
                                        onCheckDisplayName(form.getValues())
                                    }
                                >
                                    {isPendingCheck ? (
                                        <>
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait...
                                        </>
                                    ) : (
                                        'Check'
                                    )}
                                </Button>
                            </div>
                        </div>
                        {(error || success) && (
                            <div className="flex flex-row gap-x-6">
                                <div className="basis-3/4">
                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                </div>
                                <div className="basis-1/4">&nbsp;</div>
                            </div>
                        )}
                        <div className="flex-1">
                            <SubmitButton
                                text="update"
                                isPending={isPendingForm}
                                disabledCheck={displayNameAvailable}
                            />
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className={`${
                        !user?.displayName && 'italic'
                    } text-base font-normal`}
                >
                    {user?.displayName
                        ? `${user.displayName}`
                        : 'Not specified'}
                </div>
            )}
        </div>
    );
};
export default DisplayNameForm;
