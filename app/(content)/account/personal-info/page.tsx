import GenderForm from '@/components/account/GenderForm';
import NameForm from '@/components/account/NameForm';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';

const PersonalInfoPage = async () => {
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
                            Personal Info
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-8 mb-14">
                <h1 className="text-4xl font-semibold">Personal Info</h1>
            </div>
            <div className="flex flex-row gap-x-16">
                <div className="flex flex-col w-3/5">
                    {/* Start Name Edit */}
                    <NameForm />
                    {/* End Name Edit */}
                    <GenderForm genderProp={userDb?.gender || undefined} />
                </div>
                <div className="flex flex-col w-2/5">Profile Pic</div>
            </div>
        </div>
    );
};
export default PersonalInfoPage;
