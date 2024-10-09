"use client";

import { Delete, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/utils/fetcher";
import { AddressAutoCompleteProps, AddressType } from "@/types/autocomplete";
import AddressAutoCompleteInput from "./AddressAutoCompleteInput";
import AddressForm from "./AddressForm";

const AddressAutoComplete = (props: AddressAutoCompleteProps) => {
    const {
        address,
        setAddress,
        showInlineError = true,
        searchInput,
        setSearchInput,
        placeholder
    } = props;

    const [selectedPlaceId, setSelectedPlaceId] = useState("");
    const { data, isLoading } = useSWR(
        selectedPlaceId === ""
            ? null
            : `/api/address/place?placeId=${selectedPlaceId}`,
        fetcher,
        {
            revalidateOnFocus: false
        }
    );

    const adrAddress = data?.data.adrAddress;

    useEffect(() => {
        if (data?.data.address) {
            setAddress(data.data.address as AddressType);
        }
    }, [data, setAddress]);

    return (
        <>
            {selectedPlaceId !== "" || address.formattedAddress ? (
                <div className="flex items-center gap-2">
                    <Input value={address?.formattedAddress} readOnly />
                    <Button
                        type="reset"
                        onClick={() => {
                            setSelectedPlaceId("");
                            setAddress({
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
                        }}
                        size="icon"
                        variant="outline"
                        className="shrink-0"
                    >
                        <Delete className="size-4" />
                    </Button>
                </div>
            ) : (
                <AddressAutoCompleteInput
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    selectedPlaceId={selectedPlaceId}
                    setSelectedPlaceId={setSelectedPlaceId}
                    showInlineError={showInlineError}
                    placeholder={placeholder}
                />
            )}
            <AddressForm
                adrAddress={adrAddress}
                address={address}
                setAddress={setAddress}
            />
        </>
    );
};

export default AddressAutoComplete;
