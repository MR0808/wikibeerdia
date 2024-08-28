'use client';
import { forwardRef } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormInputProps = {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
};

export const FormInputAuth = forwardRef<HTMLInputElement, FormInputProps>(
    function FormInputAuth({ label, name, type, defaultValue, ...props }, ref) {
        return (
            <>
                <Input
                    type={type}
                    placeholder={label}
                    name={name}
                    {...props}
                    className="rounded-full h-14 bg-purple-50 border border-zinc-800 border-opacity-30 focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-opacity-20 focus-visible:ring-offset-2 placeholder-zinc-800 placeholder-opacity-30 px-6"
                />
            </>
        );
    }
);

export const PasswordInputAuth = forwardRef<HTMLInputElement, FormInputProps>(
    function PasswordInputAuth(
        { label, name, type, defaultValue, ...props },
        ref
    ) {
        const [showPassword, setShowPassword] = useState(false);
        return (
            <>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={label}
                    name={name}
                    {...props}
                    className="rounded-full h-14 bg-purple-50 border border-zinc-800 border-opacity-30 focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-opacity-20 focus-visible:ring-offset-2 placeholder-zinc-800 placeholder-opacity-30 px-6"
                />
                <div
                    className="absolute inset-y-0 right-0 flex items-center pl-3"
                    tabIndex={-1}
                >
                    <Button
                        type="button"
                        variant="link"
                        onClick={() => {
                            setShowPassword((prev) => !prev);
                        }}
                    >
                        {showPassword ? (
                            <FaRegEye className="size-5" />
                        ) : (
                            <FaRegEyeSlash className="size-5" />
                        )}
                    </Button>
                </div>
            </>
        );
    }
);
