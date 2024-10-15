import { redirect } from "next/navigation";

import { getBreweryTypesForms } from "@/actions/breweryTypes";
import BreweryForm from "@/components/breweries/BreweryForm";
import getSession from "@/lib/session";
import { checkAuthenticated } from "@/lib/auth";

const SubmitBreweryPage = async () => {
    const user = await checkAuthenticated()
    if (!user) { redirect("/login");}

    const session = await getSession();
    const breweryTypes = await getBreweryTypesForms();

    return (
        <>
            <div className="mx-auto mt-36 flex h-16 w-[55%] flex-col justify-between space-y-12 sm:justify-between sm:space-x-0 md:space-x-4">
                <div className="flex w-full flex-col justify-between">
                    <div className="flex flex-col gap-y-5">
                        <h1 className="text-4xl font-semibold">Add Brewery</h1>
                    </div>
                </div>
            </div>
            <BreweryForm
                edit={false}
                session={session}
                breweryTypes={breweryTypes.data}
            />
        </>
    );
};

export default SubmitBreweryPage;
