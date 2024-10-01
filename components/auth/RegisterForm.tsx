"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import FormError from "@/components/form/FormError";
import FormSuccess from "@/components/form/FormSuccess";
import {
  FormInputAuth,
  PasswordInputAuth,
} from "@/components/form/FormInputAuth";
import { AuthSubmitButton } from "@/components/form/Buttons";
import { RegisterSchema } from "@/schemas/auth";
import register from "@/actions/register";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const errorClass = "pl-6";

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <>
      {!success && (
        <Form {...form}>
          <FormError message={error} />
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative grid grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInputAuth
                          {...field}
                          label="First Name"
                          name="firstName"
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
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInputAuth
                          {...field}
                          label="Last Name"
                          name="lastName"
                          type="text"
                          defaultValue=""
                        />
                      </FormControl>
                      <FormMessage className={errorClass} />
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
            <div>
              <AuthSubmitButton text="Register" isPending={isPending} />
            </div>
          </form>
        </Form>
      )}
      {success && <FormSuccess message={success} />}
    </>
  );
};
export default RegisterForm;
