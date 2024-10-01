"use client";
import { forwardRef } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
          className="h-14 rounded-full border border-zinc-800 border-opacity-30 bg-purple-50 px-6 placeholder-zinc-800 placeholder-opacity-30 focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-opacity-20 focus-visible:ring-offset-2"
        />
      </>
    );
  },
);

export const PasswordInputAuth = forwardRef<HTMLInputElement, FormInputProps>(
  function PasswordInputAuth(
    { label, name, type, defaultValue, ...props },
    ref,
  ) {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={label}
          name={name}
          {...props}
          className="h-14 rounded-full border border-zinc-800 border-opacity-30 bg-purple-50 px-6 placeholder-zinc-800 placeholder-opacity-30 focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-opacity-20 focus-visible:ring-offset-2"
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
              <Eye className="size-5" />
            ) : (
              <EyeOff className="size-5" />
            )}
          </Button>
        </div>
      </>
    );
  },
);
