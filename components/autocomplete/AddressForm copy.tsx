"use client";

import { z } from "zod";

import { AddressFields, AddressFormProps } from "@/types/autocomplete";

/**
 * Create a Zod schema for validating address fields.
 * Note that, different address vary from place to place.
 * This Schema makes sure that the required fields are filled.
 */
export const createAddressSchema = (address: AddressFields) => {
    let schema = {};

    if (address.address1 !== "") {
        schema = {
            ...schema,
            address1: z.string().min(1, {
                message: "Address line 1 is required"
            })
        };
    }

    schema = {
        ...schema,
        address2: z.string().optional()
    };

    if (address.city !== "") {
        schema = {
            ...schema,
            city: z.string().min(1, {
                message: "City is required"
            })
        };
    }

    if (address.region !== "") {
        schema = {
            ...schema,
            region: z.string().min(1, {
                message: "State is required"
            })
        };
    }

    if (address.postalCode !== "") {
        schema = {
            ...schema,
            postalCode: z.string().min(1, {
                message: "Postal code is required"
            })
        };
    }

    return z.object(schema);
};

const AddressForm = (props: React.PropsWithChildren<AddressFormProps>) => {
    /**
     * Update and format the address string with the given components
     */
    function updateAndFormatAddress(
        addressString: string,
        addressComponents: {
            "street-address": string;
            address2: string;
            locality: string;
            region: string;
            "postal-code": string;
        }
    ) {
        let updatedAddressString = addressString;

        // Replace each class content with its corresponding value
        Object.entries(addressComponents).forEach(([key, value]) => {
            if (key !== "address2") {
                const regex = new RegExp(
                    `(<span class="${key}">)[^<]*(</span>)`,
                    "g"
                );
                updatedAddressString = updatedAddressString.replace(
                    regex,
                    `$1${value}$2`
                );
            }
        });

        // Remove all span tags
        updatedAddressString = updatedAddressString.replace(
            /<\/?span[^>]*>/g,
            ""
        );

        // Add address2 just after address1 if provided
        if (addressComponents.address2) {
            const address1Regex = new RegExp(
                `${addressComponents["street-address"]}`
            );
            updatedAddressString = updatedAddressString.replace(
                address1Regex,
                `${addressComponents["street-address"]}, ${addressComponents.address2}`
            );
        }

        // Clean up any extra spaces or commas
        updatedAddressString = updatedAddressString
            .replace(/,\s*,/g, ",")
            .trim()
            .replace(/\s\s+/g, " ")
            .replace(/,\s*$/, "");

        return updatedAddressString;
    }

    /**
     * Handle form submission and save the address
     */
    // const handleSave = (e: FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         addressSchema.parse({
    //             address1,
    //             address2,
    //             city,
    //             region,
    //             postalCode
    //         });
    //     } catch (error) {
    //         const zodError = error as ZodError;
    //         const errorMap = zodError.flatten().fieldErrors;

    //         setErrorMap({
    //             address1: errorMap.address1?.[0] ?? "",
    //             address2: errorMap.address2?.[0] ?? "",
    //             city: errorMap.city?.[0] ?? "",
    //             region: errorMap.region?.[0] ?? "",
    //             postalCode: errorMap.postalCode?.[0] ?? ""
    //         });

    //         return;
    //     }

    //     if (
    //         address2 !== address.address2 ||
    //         postalCode !== address.postalCode ||
    //         address1 !== address.address1 ||
    //         city !== address.city ||
    //         region !== address.region
    //     ) {
    //         const newFormattedAddress = updateAndFormatAddress(adrAddress, {
    //             "street-address": address1,
    //             address2,
    //             locality: city,
    //             region,
    //             "postal-code": postalCode
    //         });

    //         setAddress({
    //             ...address,
    //             city,
    //             region,
    //             address2,
    //             address1,
    //             postalCode,
    //             formattedAddress: newFormattedAddress
    //         });
    //     }
    //     setOpen(false);
    // };
};

export default AddressForm;
