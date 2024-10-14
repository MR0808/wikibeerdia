"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from "@/components/ui/carousel";
import { BreweryType } from "@/types/breweries";
import { BreweryImagesThumbnail } from "./BreweryImagesThumbnail";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BreweryImages = ({ data }: { data: BreweryType }) => {
    const images = data.images;
    const [api, setApi] = useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
        axis: "y"
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!api || !emblaThumbsApi) return;
            api.scrollTo(index);
        },
        [api, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!api || !emblaThumbsApi) return;
        setSelectedIndex(api.selectedScrollSnap());
        emblaThumbsApi.scrollTo(api.selectedScrollSnap());
    }, [api, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!api) return;
        onSelect();

        api.on("select", onSelect).on("reInit", onSelect);
    }, [api, onSelect]);

    return (
        <>
            <Carousel
                opts={{ loop: true }}
                className={cn("mt-24 flex flex-row space-x-3")}
                setApi={setApi}
            >
                <div className="w-5/6 rounded-lg bg-white p-8 shadow-lg md:mb-20">
                    <div className="relative z-[1] overflow-hidden rounded-3xl">
                        <CarouselContent>
                            {images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="flex h-[600px] w-full items-center justify-center rounded-xl bg-background outline outline-1 outline-border">
                                        <Image
                                            src={image.image}
                                            alt={`${data.name} - Image ${index + 1}`}
                                            className={cn(
                                                "h-[600px] w-full rounded-xl"
                                            )}
                                            height={600}
                                            width={600}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <Button
                            className="absolute bottom-0 left-7 top-7 z-[1] flex h-14 w-14 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-2xl text-black"
                            onClick={() => api?.scrollPrev()}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            className="absolute bottom-0 left-28 right-0 top-7 z-[1] flex h-14 w-14 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-2xl text-black"
                            onClick={() => api?.scrollNext()}
                        >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
                <div className="w-1/6 rounded-lg bg-white p-5 shadow-lg md:mb-20">
                    <div className="block overflow-hidden" ref={emblaThumbsRef}>
                        <div className="flex h-[600px] flex-col space-y-6">
                            {images.map((image, index) => (
                                <BreweryImagesThumbnail
                                    key={index}
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    index={index}
                                    src={image.image}
                                    name={data.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Carousel>
        </>
    );
};
export default BreweryImages;
