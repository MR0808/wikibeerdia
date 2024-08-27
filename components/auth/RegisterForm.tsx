'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTransition, useState } from 'react';


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import AuthWrapper from './AuthWrapper';
import {
    FormInputIcon,
    RegisterPasswordInputIcon
} from '@/components/form/FormInputIcon';
import { AuthSubmitButton } from '@/components/form/Buttons';
import { RegisterSchema } from '@/schemas';
import register from '@/actions/register';

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "", 
          password: ""
        },
      })

      const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <AuthWrapper
            paragraph="How ever you want to say it, welcome aboard to Wikibeerdia, the best online encyclopedia for beer! Create your account now, and take advantage of being a member of the best beer community around."
            heading="Register Now!"
            subHeading="Use the form below to register your account"
            backButtonString="Already have an account?"
            backButtonHref="/login"
            backButtonLabel="Login"
        >
            <Form {...form}>
                <form className="mt-8 space-y-6">
                    <div className="relative grid grid-cols-2 gap-4">
                        <div>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormInputIcon
                                                label="First Name"
                                                name="firstName"
                                                type="text"
                                                defaultValue=""
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormInputIcon
                                                label="Last Name"
                                                name="lastName"
                                                type="text"
                                                defaultValue=""
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                        </div>
                    </div>
                    <div className="relative">
                    <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FormInputIcon
                                                label="Email"
                                                name="email"
                                                type="text"
                                                defaultValue=""
                                            />
                                        </FormControl>
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
                                        <RegisterPasswordInputIcon />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                        
                    </div>
                    <div>
                        <AuthSubmitButton text="Register" />
                    </div>
                </form>
            </Form>
        </AuthWrapper>
    );
};
export default RegisterForm;
