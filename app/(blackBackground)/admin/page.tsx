import Link from "next/link";
import { Factory, Beer, Hop } from "lucide-react";
import { redirect } from "next/navigation";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { checkAuthenticated } from "@/lib/auth";

const AdminPage = async () => {
    const user = await checkAuthenticated(true);
    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container mt-36 flex h-16 flex-col justify-between sm:justify-between sm:space-x-0 md:space-x-4">
            <div className="flex w-full flex-col justify-between">
                <div className="flex flex-col gap-y-5">
                    <h1 className="text-4xl font-semibold">Admin</h1>
                </div>
            </div>
            <div className="mt-12 flex w-4/5 content-start">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Link href="/admin/brewery-types">
                        <Card className="w-[350px] shadow-md hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="mb-4">
                                    <Hop className="size-7" />
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-black">
                                    Brewery Types
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/beer-styles">
                        <Card className="w-[350px] shadow-md hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="mb-4">
                                    <Beer className="size-7" />
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-black">
                                    Beer Styles
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/breweries">
                        <Card className="w-[350px] shadow-md hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="mb-4">
                                    <Factory className="size-7" />
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-black">
                                    Breweries
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default AdminPage;
