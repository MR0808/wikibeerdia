import Link from 'next/link';
import { FaRegAddressCard } from 'react-icons/fa6';
import { GoLock } from 'react-icons/go';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

const AccountPage = () => {
    return (
        <div className="mt-36 container flex flex-col h-16 md:space-x-4 sm:justify-between justify-between sm:space-x-0">
            <div className="flex flex-col w-full justify-between">
                <div className="flex flex-col gap-y-5">
                    <h1 className="text-4xl font-semibold">Account</h1>
                    <Link
                        href="/profile"
                        className="text-lg font-semibold hover:text-primary text-blue-600"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
            <div className="flex content-start mt-12 w-4/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/account/personal-info">
                        <Card className="w-[350px] shadow-md hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="mb-4">
                                    <FaRegAddressCard className="size-7" />
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-black">
                                    Personal Info
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm">
                                Manage your personal information so we can best
                                serve you
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/account/security">
                        <Card className="w-[350px] shadow-md hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="mb-4">
                                    <GoLock className="size-7" />
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-black">
                                    Login and Security
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm">
                                Manage your passwords, 2FA and other important
                                settings to keep you secure
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default AccountPage;
