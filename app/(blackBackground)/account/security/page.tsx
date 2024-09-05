import EmailForm from '@/components/account/security/EmailForm';
import PasswordForm from '@/components/account/security/PasswordForm';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import { auth } from '@/auth';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import TwoFactorForm from '@/components/account/security/TwoFactorForm';

const SecurityPage = async () => {
    const session = await auth();
    const user = await currentUser();
    const userDb = await getUserById(user?.id!);

    return (
        <div className="container flex flex-col h-16 sm:justify-between justify-between sm:space-x-0 mt-36">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-base" href="/account">
                            Account
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-base" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-base">
                            Login and Security
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-8 mb-14">
                <h1 className="text-4xl font-semibold">Login and Security</h1>
            </div>
            <div className="flex flex-row gap-x-16">
                <div className="flex flex-col w-3/5">
                    <EmailForm session={session} />
                    <PasswordForm session={session} />
                    <TwoFactorForm
                        session={session}
                        isTwoFactorEnabled={userDb?.isTwoFactorEnabled || false}
                    />
                </div>
                <div className="flex flex-col w-2/5">More goes here</div>
            </div>
        </div>
    );
};
export default SecurityPage;
