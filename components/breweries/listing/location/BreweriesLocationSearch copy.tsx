"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMapStore } from "@/hooks/useMapStore";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string;
const libraries: "places"[] = ["places"];

const LocationSearchScehma = z.object({
    search: z
        .string()
        .min(3, "Search must be at least 3 characters")
        .or(z.literal("")),
    suburb: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    breweryType: z.string()
});

type LocationFormData = z.infer<typeof LocationSearchScehma>;

const BreweriesLocationSearch = ({
    types
}: {
    types: {
        data: {
            id: string;
            name: string;
        }[];
    };
}) => {
    const {
        userLocation,
        setUserLocation,
        breweryType,
        setBreweryType,
        setTypeOnly
    } = useMapStore();
    const [address, setAddress] = useState("");

    let latitude = 0;
    let longitude = 0;
    if (userLocation) {
        latitude = userLocation[1];
        longitude = userLocation[0];
    }

    const form = useForm<LocationFormData>({
        resolver: zodResolver(LocationSearchScehma),
        defaultValues: {
            search: address || "",
            suburb: "",
            state: "",
            country: "",
            latitude,
            longitude,
            breweryType: breweryType
        }
    });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );

    const onPlaceChanged = () => {
        if (!autocompleteRef.current) return;

        const place = autocompleteRef.current.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const location = place.geometry.location as google.maps.LatLng;
        const latitude = location.lat();
        const longitude = location.lng();

        const formattedPlace: Partial<LocationFormData> = {
            search: place.formatted_address || "",
            suburb:
                place.address_components?.find((c) =>
                    c.types.includes("locality")
                )?.long_name || "",
            state:
                place.address_components?.find((c) =>
                    c.types.includes("administrative_area_level_1")
                )?.long_name || "",
            country:
                place.address_components?.find((c) =>
                    c.types.includes("country")
                )?.long_name || "",
            latitude,
            longitude
        };

        // Update react-hook-form fields
        Object.entries(formattedPlace).forEach(([key, value]) => {
            form.setValue(key as keyof LocationFormData, value);
        });
    };

    const onSubmit = (data: LocationFormData) => {
        setTypeOnly(true);
        setBreweryType(data.breweryType);
        if (data.latitude && data.longitude && data.search) {
            setUserLocation([data.longitude, data.latitude]);
            setTypeOnly(false);
        }
    };

    return (
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        "mb-5 flex w-full flex-row space-x-10 rounded-4xl bg-gray-100 p-4"
                    )}
                >
                    {/* Search Field with Google Autocomplete */}
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className={cn("w-3/5 space-y-0")}>
                                <FormControl className={cn("w-full space-y-0")}>
                                    <Autocomplete
                                        onLoad={(auto) => {
                                            autocompleteRef.current = auto;
                                            // Set location bias if user location is available
                                            if (userLocation) {
                                                auto.setBounds(
                                                    new google.maps.LatLngBounds(
                                                        new google.maps.LatLng(
                                                            userLocation[0],
                                                            userLocation[1]
                                                        )
                                                    )
                                                );
                                            }
                                        }}
                                        onPlaceChanged={onPlaceChanged}
                                        options={{
                                            bounds: userLocation
                                                ? new google.maps.LatLngBounds(
                                                      new google.maps.LatLng(
                                                          userLocation[0],
                                                          userLocation[1]
                                                      )
                                                  )
                                                : undefined
                                        }}
                                        className={cn("w-full")}
                                    >
                                        <Input
                                            {...field}
                                            placeholder="Enter a location..."
                                            value={field.value}
                                            onChange={field.onChange}
                                            className={cn("w-full")}
                                        />
                                    </Autocomplete>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="breweryType"
                        render={({ field }) => (
                            <FormItem className={cn("w-2/5")}>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a brewery type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        {types.data.map((type) => {
                                            return (
                                                <SelectItem
                                                    value={type.id}
                                                    key={type.id}
                                                >
                                                    {type.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-20">
                        Search
                    </Button>
                </form>
            </Form>
        </LoadScript>
    );
};
export default BreweriesLocationSearch;
