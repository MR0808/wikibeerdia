"use client";

import { Command as CommandPrimitive } from "cmdk";
import { Delete, Loader2, Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandList
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { fetcher } from "@/utils/fetcher";
import { FormMessages } from "@/components/form/FormMessages";
import AddressDialog from "./AddressDialog";
import { AddressSchema } from "@/schemas/autocomplete";
import {
    AddressAutoCompleteProps,
    AddressType,
    CommonProps
} from "@/types/autocomplete";

export const AutocompleteComponent = () => {
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
            dialogTitle="Enter Address"
        />
    );
};

export default function AddressAutoComplete(props: AddressAutoCompleteProps) {
    const {
        address,
        setAddress,
        dialogTitle,
        showInlineError = true,
        searchInput,
        setSearchInput,
        placeholder
    } = props;

    const [selectedPlaceId, setSelectedPlaceId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useSWR(
        // For real use case: /api/address/place?placeId=${selectedPlaceId}
        // : `/api/address/mock-place?placeId=${selectedPlaceId}`,
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

                    <AddressDialog
                        isLoading={isLoading}
                        dialogTitle={dialogTitle}
                        adrAddress={adrAddress}
                        address={address}
                        setAddress={setAddress}
                        open={isOpen}
                        setOpen={setIsOpen}
                    >
                        <Button
                            disabled={isLoading}
                            size="icon"
                            variant="outline"
                            className="shrink-0"
                        >
                            <Pencil className="size-4" />
                        </Button>
                    </AddressDialog>
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
                    setIsOpenDialog={setIsOpen}
                    showInlineError={showInlineError}
                    placeholder={placeholder}
                />
            )}
        </>
    );
}

function AddressAutoCompleteInput(props: CommonProps) {
    const {
        setSelectedPlaceId,
        selectedPlaceId,
        setIsOpenDialog,
        showInlineError,
        searchInput,
        setSearchInput,
        placeholder
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            close();
        }
    };

    const debouncedSearchInput = useDebounce(searchInput, 500);

    const { data, isLoading } = useSWR(
        // For real use case: /api/address/autocomplete?input=${debouncedSearchInput}
        // `/api/address/mock-autocomplete?input=${debouncedSearchInput}`,
        `/api/address/autocomplete?input=${debouncedSearchInput}`,
        fetcher
    );

    const predictions = data?.data || [];

    return (
        <Command
            shouldFilter={false}
            onKeyDown={handleKeyDown}
            className="overflow-visible"
        >
            <div className="flex w-full items-center justify-between rounded-lg border bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <CommandPrimitive.Input
                    value={searchInput}
                    onValueChange={setSearchInput}
                    onBlur={close}
                    onFocus={open}
                    placeholder={placeholder || "Enter address"}
                    className="w-full rounded-lg p-3 outline-none"
                />
            </div>
            {searchInput !== "" &&
                !isOpen &&
                !selectedPlaceId &&
                showInlineError && (
                    <FormMessages
                        type="error"
                        className="pt-1 text-sm"
                        messages={["Select a valid address from the list"]}
                    />
                )}

            {isOpen && (
                <div className="relative h-auto animate-in fade-in-0 zoom-in-95">
                    <CommandList>
                        <div className="absolute top-1.5 z-50 w-full">
                            <CommandGroup className="relative z-50 h-auto min-w-[8rem] overflow-hidden rounded-md border bg-background shadow-md">
                                {isLoading ? (
                                    <div className="flex h-28 items-center justify-center">
                                        <Loader2 className="size-6 animate-spin" />
                                    </div>
                                ) : (
                                    <>
                                        {predictions.map(
                                            (prediction: {
                                                placePrediction: {
                                                    placeId: string;
                                                    place: string;
                                                    text: { text: string };
                                                };
                                            }) => (
                                                <CommandPrimitive.Item
                                                    value={
                                                        prediction
                                                            .placePrediction
                                                            .text.text
                                                    }
                                                    onSelect={() => {
                                                        setSearchInput("");
                                                        setSelectedPlaceId(
                                                            prediction
                                                                .placePrediction
                                                                .place
                                                        );
                                                        setIsOpenDialog(true);
                                                    }}
                                                    className="flex h-max cursor-pointer select-text flex-col items-start gap-0.5 rounded-md p-2 px-3 hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                                    key={
                                                        prediction
                                                            .placePrediction
                                                            .placeId
                                                    }
                                                    onMouseDown={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    {
                                                        prediction
                                                            .placePrediction
                                                            .text.text
                                                    }
                                                </CommandPrimitive.Item>
                                            )
                                        )}
                                    </>
                                )}

                                <CommandEmpty>
                                    {!isLoading && predictions.length === 0 && (
                                        <div className="flex items-center justify-center py-4">
                                            {searchInput === ""
                                                ? "Please enter an address"
                                                : "No address found"}
                                        </div>
                                    )}
                                </CommandEmpty>
                            </CommandGroup>
                        </div>
                    </CommandList>
                </div>
            )}
        </Command>
    );
}

/**
 * Checks if the autocomplete address is valid. Change to your own validation logic.
 * @param {AddressType} address - The address object to validate.
 * @param {string} searchInput - The search input string.
 * @returns {boolean} - Returns true if the autocomplete address is valid, otherwise false.
 */
export const isValidAutocomplete = (
    address: AddressType,
    searchInput: string
) => {
    if (searchInput.trim() === "") {
        return true;
    }

    const result = AddressSchema.safeParse(address);
    return result.success;
};
