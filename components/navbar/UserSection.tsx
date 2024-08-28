'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BsChevronDown } from 'react-icons/bs';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaCog } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import profile from '@/public/images/profile.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProps } from '@/utils/types';
import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';

const UserSection = ({ user }: UserProps) => {
    const [open, setOpen] = useState(false);

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
                            <Image
                                src={profile}
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                        </AvatarFallback>
                    </Avatar>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <div className="relative flex items-center justify-between py-2 text-base font-medium text-dark group-hover:text-primary lg:ml-3 lg:mr-0 lg:inline-flex lg:pl-0 lg:group-hover:text-primary cursor-pointer">
                                Account
                                <BsChevronDown className="ml-2 fill-current hidden md:block" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-48"
                            sideOffset={10}
                            alignOffset={20}
                        >
                            <div className="grid gap-4">
                                <div className="grid gap-4">
                                    <div className="grid items-center gap-6">
                                        <Link
                                            href="/profile"
                                            className="flex w-full gap-2 items-center hover:text-primary hover:ml-2 hover:transition-all duration-300"
                                        >
                                            <FaCog />
                                            <div className="block font-sans text-md font-normal leading-normal text-inherit antialiased">
                                                My Profile
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid items-center gap-4">
                                        <Link
                                            href="/account"
                                            className="flex w-full gap-2 items-center hover:text-primary hover:ml-2 hover:transition-all duration-300"
                                        >
                                            <FaRegCircleUser />
                                            <div className="block font-sans text-md font-normal leading-normal text-inherit antialiased">
                                                Account
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid items-center gap-4">
                                        <span
                                            onClick={onClick}
                                            className="flex w-full gap-2 items-center hover:text-primary hover:ml-2 hover:transition-all duration-300 cursor-pointer"
                                        >
                                            <FiLogOut />
                                            <div className="block font-sans text-md font-normal leading-normal text-inherit antialiased">
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
                        className="flex rounded text-sm sm:text-md h-11 border border-primary p-2"
                    >
                        Login / Signup
                    </Button>
                </Link>
            )}
        </>
    );
};
export default UserSection;
