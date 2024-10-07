export interface AddressType {
    address1: string;
    address2: string;
    formattedAddress: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    lat: number;
    lng: number;
    countryCode: string;
}

export interface AddressAutoCompleteProps {
    address: AddressType;
    setAddress: (address: AddressType) => void;
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
    dialogTitle: string;
    showInlineError?: boolean;
    placeholder?: string;
}

export interface CommonProps {
    selectedPlaceId: string;
    setSelectedPlaceId: (placeId: string) => void;
    setIsOpenDialog: (isOpen: boolean) => void;
    showInlineError?: boolean;
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
    placeholder?: string;
}

export interface AddressDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    address: AddressType;
    setAddress: (address: AddressType) => void;
    adrAddress: string;
    dialogTitle: string;
    isLoading: boolean;
}

export interface AddressFields {
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
}
