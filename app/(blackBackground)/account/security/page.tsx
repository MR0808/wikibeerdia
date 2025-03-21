import { redirect } from "next/navigation";

import EmailForm from "@/components/account/security/EmailForm";
import PasswordForm from "@/components/account/security/PasswordForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import TwoFactorForm from "@/components/account/security/TwoFactorForm";
import getSession from "@/lib/session";
import { checkAuthenticated } from "@/lib/auth";

export async function generateMetadata() {
    return {
        title: "Account Management | Security",
        description: "Wikibeerdia Security Management"
    };
}

const SecurityPage = async () => {
    const user = await checkAuthenticated();
    if (!user) {
        redirect("/login");
    }

    const session = await getSession();

    return (
        <div className="container mt-36 flex h-16 flex-col justify-between sm:justify-between sm:space-x-0">
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
                <div className="flex w-80 flex-col sm:w-3/5">
                    <EmailForm session={session} />
                    <PasswordForm session={session} />
                    <TwoFactorForm session={session} />
                </div>
            </div>
        </div>
    );
};
export default SecurityPage;
