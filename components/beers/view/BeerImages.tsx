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
import { BeerType } from "@/types/beers";
import { BeerImagesThumbnail } from "./BeerImagesThumbnail";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BeerImages = ({ data }: { data: BeerType }) => {
    const images = data.images;
    const [api, setApi] = useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
        axis: "x",
        breakpoints: {
            "(min-width: 640px)": { axis: "y" }
        }
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
                className={cn(
                    "flex h-full flex-col justify-between md:space-x-3"
                )}
                setApi={setApi}
            >
                <div className="relative z-1 overflow-hidden rounded-3xl">
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="flex h-44 w-full items-center justify-center rounded-xl bg-background outline outline-1 outline-border md:h-[600px]">
                                    <Image
                                        src={image.image}
                                        alt={`${data.name} - Image ${index + 1}`}
                                        className={cn(
                                            "h-44 w-full rounded-xl md:h-[600px]"
                                        )}
                                        height={600}
                                        width={600}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <Button
                        className="absolute bottom-0 left-7 top-7 z-1 hidden h-14 w-14 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-2xl text-black md:flex"
                        onClick={() => api?.scrollPrev()}
                    >
                        <ChevronLeftIcon />
                    </Button>
                    <Button
                        className="absolute bottom-0 left-28 right-0 top-7 z-1 hidden h-14 w-14 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-2xl text-black md:flex"
                        onClick={() => api?.scrollNext()}
                    >
                        <ChevronRightIcon />
                    </Button>
                    <div
                        className="mt-5 overflow-hidden md:block"
                        ref={emblaThumbsRef}
                    >
                        <div className="flex h-min flex-row space-x-2 space-y-0 p-1">
                            {images.map((image, index) => {
                                return (
                                    <BeerImagesThumbnail
                                        key={index}
                                        onClick={() => onThumbClick(index)}
                                        selected={index === selectedIndex}
                                        index={index}
                                        src={image.image}
                                        name={data.name}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Carousel>
        </>
    );
};
export default BeerImages;
