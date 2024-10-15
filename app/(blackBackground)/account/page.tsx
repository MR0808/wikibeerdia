"use server";

import Link from "next/link";
import { IdCard, Lock } from "lucide-react";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@/lib/auth";

const AccountPage = async () => {
  const user = await currentUser();
  if (!user) { redirect("/login");}
  
  return (
    <div className="container mt-36 flex h-16 flex-col justify-between sm:justify-between sm:space-x-0 md:space-x-4">
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-y-5">
          <h1 className="text-4xl font-semibold">Account</h1>
          <Link
            href="/profile"
            className="text-lg font-semibold text-blue-600 hover:text-primary"
          >
            View Profile
          </Link>
        </div>
      </div>
      <div className="mt-12 flex w-4/5 content-start">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link href="/account/personal-info">
            <Card className="w-[350px] shadow-md hover:shadow-lg">
              <CardHeader>
                <CardTitle className="mb-4">
                  <IdCard className="size-7" />
                </CardTitle>
                <CardDescription className="text-base font-medium text-black">
                  Personal Info
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                Manage your personal information so we can best serve you
              </CardContent>
            </Card>
          </Link>
          {!user?.isOAuth && (
            <Link href="/account/security">
              <Card className="w-[350px] shadow-md hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="mb-4">
                    <Lock className="size-7" />
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-black">
                    Login and Security
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  Manage your passwords, 2FA and other important settings to
                  keep you secure
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
