"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { AddressType } from "@/types/autocomplete";
import AddressAutoComplete from "./AddressAutoComplete";

const Autocomplete = () => {
    const [address, setAddress] = useState<AddressType>({
        address1: "",
        address2: "",
        formattedAddress: "",
        city: "",
        region: "",
        postalCode: "",
        country: "",
        lat: 0,
        lng: 0,
        countryCode: ""
    });
    const [searchInput, setSearchInput] = useState("");
    return (
        <AddressAutoComplete
            address={address}
            setAddress={setAddress}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
        />
    );
};

export default Autocomplete;
