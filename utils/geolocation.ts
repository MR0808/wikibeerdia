"use server";

import type { CountryCode } from "libphonenumber-js";
import { headers } from "next/headers";

export const getGeolocation = async () => {
    const ipCountry = headers().get(
        "x-vercel-ip-country"
    ) as CountryCode | null;

    return ipCountry;
};
