"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

import FormError from "@/components/form/FormError";
import {
  FormInputAuth,
  PasswordInputAuth,
} from "@/components/form/FormInputAuth";
import { AuthSubmitButton } from "@/components/form/Buttons";
import { LoginSchema } from "@/schemas/auth";
import login from "@/actions/login";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showBackupCode, setShowBackupCode] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const errorClass = "pl-6";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const backupCode = () => {
    setShowTwoFactor(false);
    setShowBackupCode(true);
    form.resetField("token");
  };

  const phoneCode = () => {
    setShowTwoFactor(true);
    setShowBackupCode(false);
    form.resetField("backupCode");
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.setValue("password", "");
            setError(data.error);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <FormError message={error || urlError} />
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <input type="hidden" name="callbackUrl" value="placeholder" />
        {showTwoFactor && (
          <div className="relative grid items-center justify-center">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className={cn("flex items-center justify-center")}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {showBackupCode && (
          <div className="relative grid items-center justify-center">
            <FormField
              control={form.control}
              name="backupCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className={cn("flex items-center justify-center")}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter one of your backup codes. This code will no
                    longer be able to be used after login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {!showTwoFactor && !showBackupCode && (
          <>
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
          </>
        )}
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
          {showTwoFactor && (
            <div className="text-sm">
              <div
                className="cursor-pointer text-indigo-400 hover:text-blue-500"
                onClick={backupCode}
              >
                Use backup code
              </div>
            </div>
          )}
          {showBackupCode && (
            <div className="text-sm">
              <div
                className="cursor-pointer text-indigo-400 hover:text-blue-500"
                onClick={phoneCode}
              >
                Use phone code
              </div>
            </div>
          )}
          {!showTwoFactor && !showBackupCode && (
            <>
              &nbsp;
              <div className="text-sm">
                <Link
                  href="/forgotpassword"
                  className="text-indigo-400 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </>
          )}
        </div>
        <div>
          <AuthSubmitButton text="Login" isPending={isPending} />
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
