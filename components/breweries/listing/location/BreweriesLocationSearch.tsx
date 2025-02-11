"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMapStore } from "@/hooks/useMapStore";

import { cn } from "@/lib/utils";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string;
const libraries: "places"[] = ["places"];

const AddressSchema = z.object({
    search: z.string().min(3, "Search must be at least 3 characters"),
    suburb: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional()
});

type LocationFormData = z.infer<typeof AddressSchema>;

const BreweriesLocationSearch = () => {
    const form = useForm<LocationFormData>({
        resolver: zodResolver(AddressSchema),
        defaultValues: {
            search: "",
            suburb: "",
            state: "",
            country: "",
            latitude: undefined,
            longitude: undefined
        }
    });

    const { userLocation, setUserLocation } = useMapStore();

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null
    );
    // const [userLocation, setUserLocation] =
    //     useState<google.maps.LatLngLiteral | null>(null);

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setUserLocation([
    //                     position.coords.latitude,
    //                     position.coords.longitude
    //                 ]);
    //             },
    //             (error) => {
    //                 console.error("Geolocation error:", error);
    //             }
    //         );
    //     }
    // }, []);

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
        console.log("Submitted Data:", data);
        if (data.latitude && data.longitude)
            setUserLocation([data.longitude, data.latitude]);
    };

    return (
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn(
                        "mb-10 flex w-full flex-row space-y-4 rounded-4xl bg-gray-100 p-4"
                    )}
                >
                    {/* Search Field with Google Autocomplete */}
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Search for a location</FormLabel>
                                <FormControl>
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
                                    >
                                        <Input
                                            {...field}
                                            placeholder="Enter a location..."
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </Autocomplete>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </LoadScript>
    );
};
export default BreweriesLocationSearch;
