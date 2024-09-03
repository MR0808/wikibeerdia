import GenderForm from '@/components/account/GenderForm';
import DisplayNameForm from '@/components/account/DisplayNameForm';
import NameForm from '@/components/account/NameForm';
import LocationForm from '@/components/account/LocationForm';
import DateOfBirthForm from '@/components/account/DateOfBirthForm';
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
import {
    getAllCountries,
    getCountryByName,
    getStatesByCountry,
    getStateById,
    getCountryById
} from '@/data/location';

const PersonalInfoPage = async () => {
    const user = await currentUser();
    const userDb = await getUserById(user?.id!);
    const countries = await getAllCountries();
    const defaultCountry = await getCountryByName('Australia');
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
                    <DisplayNameForm />
                    {!user?.isOAuth && <NameForm />}
                    <GenderForm genderProp={userDb?.gender || undefined} />
                    <LocationForm
                        countryProp={country || defaultCountry!}
                        stateProp={state || undefined}
                        countries={countries!}
                        states={states!}
                        initialValueProp={initialValueProp}
                    />
                    <DateOfBirthForm dateOfBirthProp={userDb?.dateOfBirth || undefined} />
                </div>
                <div className="flex flex-col w-2/5">Profile Pic</div>
            </div>
        </div>
    );
};
export default PersonalInfoPage;
