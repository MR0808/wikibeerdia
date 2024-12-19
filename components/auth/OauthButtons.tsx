"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import GoogleIcon from "./GoogleIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const OauthButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <div className="relative flex items-center py-5">
        <div className="grow border-t border-gray-400"></div>
        <span className="mx-4 shrink text-gray-400">or</span>
        <div className="grow border-t border-gray-400"></div>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <Button
          size="lg"
          className={cn("h-12 w-full rounded-full capitalize")}
          variant="outline"
          onClick={() => onClick("google")}
        >
          <GoogleIcon className="mr-2 h-5 w-5" /> Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default OauthButtons;
