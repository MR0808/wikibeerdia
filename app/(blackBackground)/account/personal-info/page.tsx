import GenderForm from "@/components/account/personal-info/GenderForm";
import DisplayNameForm from "@/components/account/personal-info/DisplayNameForm";
import NameForm from "@/components/account/personal-info/NameForm";
import LocationForm from "@/components/account/personal-info/LocationForm";
import DateOfBirthForm from "@/components/account/personal-info/DateOfBirthForm";
import ProfilePictureForm from "@/components/account/personal-info/ProfilePictureForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import getSession from "@/lib/session";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import {
    getAllCountries,
    getCountryByName,
    getStatesByCountry,
    getStateById,
    getCountryById,
} from "@/data/location";

const PersonalInfoPage = async () => {
    const user = await currentUser();
    const session = await getSession();
    const userDb = await getUserById(user?.id!);
    const countries = await getAllCountries();
    const defaultCountry = await getCountryByName("Australia");
    const initialValueProp = userDb?.countryId ? true : false;
    const states = userDb?.countryId
        ? await getStatesByCountry(userDb.countryId)
        : await getStatesByCountry(defaultCountry?.id!);
    const country = userDb?.countryId
        ? await getCountryById(userDb.countryId!)
        : await getCountryById(defaultCountry?.id!);
    const state = userDb?.countryId
        ? await getStateById(userDb.stateId!)
        : await getStateById(defaultCountry?.id!);

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
                            Personal Info
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mb-14 mt-8">
                <h1 className="text-4xl font-semibold">Personal Info</h1>
            </div>
            <div className="flex flex-col-reverse gap-x-16 sm:flex-row">
                <div className="flex w-80 flex-col sm:w-3/5">
                    <DisplayNameForm session={session} />
                    {!user?.isOAuth && <NameForm session={session} />}
                    <GenderForm genderProp={userDb?.gender || undefined} />
                    <LocationForm
                        countryProp={country || defaultCountry!}
                        stateProp={state || undefined}
                        countries={countries!}
                        states={states!}
                        initialValueProp={initialValueProp}
                    />
                    <DateOfBirthForm
                        dateOfBirthProp={userDb?.dateOfBirth || undefined}
                    />
                </div>
                <div className="flex w-2/5 flex-col">
                    <ProfilePictureForm session={session} />
                </div>
            </div>
        </div>
    );
};
export default PersonalInfoPage;
