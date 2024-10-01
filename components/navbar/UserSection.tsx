"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, CircleUserRound, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import profile from "@/public/images/profile.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

const UserSection = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: newSession, update } = useSession();

  const [user, setUser] = useState(session?.user);

  useEffect(() => {
    setOpen(false);
    update();
  }, [pathname]);

  useEffect(() => {
    if (newSession && newSession.user) {
      setUser(newSession?.user);
    }
  }, [newSession]);

  // useEffect(() => {
  //     const sessionUpdatedEventHandler = () => {
  //         update();
  //         setUser(session?.user);
  //     };

  //     window.addEventListener(
  //         'sessionUpdated',
  //         sessionUpdatedEventHandler,
  //         false
  //     );
  //     return () => {
  //         window.removeEventListener(
  //             'sessionUpdated',
  //             sessionUpdatedEventHandler
  //         );
  //     };
  // }, [update]);

  const openMenu = () => {
    setOpen(true);
  };

  const onClick = () => {
    logout();
  };
  return (
    <>
      {user ? (
        <>
          <Avatar onClick={openMenu} className="cursor-pointer">
            <AvatarImage
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback asChild>
              <Image src={profile} alt={`${user.firstName} ${user.lastName}`} />
            </AvatarFallback>
          </Avatar>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="text-dark relative flex cursor-pointer items-center justify-between py-2 text-base font-medium group-hover:text-primary lg:ml-3 lg:mr-0 lg:inline-flex lg:pl-0 lg:group-hover:text-primary">
                Account
                <ChevronDown className="ml-2 hidden fill-current md:block" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48" sideOffset={10} alignOffset={20}>
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <div className="grid items-center gap-6">
                    <Link
                      href="/profile"
                      className="flex w-full items-center gap-2 duration-300 hover:ml-2 hover:text-primary hover:transition-all"
                    >
                      <CircleUserRound />
                      <div className="text-md block font-sans font-normal leading-normal text-inherit antialiased">
                        My Profile
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid items-center gap-4">
                    <Link
                      href="/account"
                      className="flex w-full items-center gap-2 duration-300 hover:ml-2 hover:text-primary hover:transition-all"
                    >
                      <Settings />
                      <div className="text-md block font-sans font-normal leading-normal text-inherit antialiased">
                        Account
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid items-center gap-4">
                    <span
                      onClick={onClick}
                      className="flex w-full cursor-pointer items-center gap-2 duration-300 hover:ml-2 hover:text-primary hover:transition-all"
                    >
                      <LogOut />
                      <div className="text-md block font-sans font-normal leading-normal text-inherit antialiased">
                        Logout
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <Link href="/login">
          <Button
            variant="ghost"
            className="sm:text-md flex h-11 rounded border border-primary p-2 text-sm"
          >
            Login / Signup
          </Button>
        </Link>
      )}
    </>
  );
};
export default UserSection;
