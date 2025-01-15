"use client";

import { Beer } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";

import { averia, kaushan } from "@/app/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StylesSectionProps } from "@/types/education";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const StylesSection = ({ parentStyles }: StylesSectionProps) => {
    const isDesktop = useMediaQuery("(min-width: 640px)");

    if (isDesktop) {
        return (
            <div className="bg-primary/15 mx-24 flex flex-col justify-between space-y-10 rounded-2xl py-10 sm:justify-between sm:space-x-0 md:mt-20 md:py-24">
                <div className="mb-20 flex flex-col justify-center justify-items-center md:flex-row">
                    <div className="flex items-center justify-center md:w-2/5 md:space-x-4">
                        <div className="hidden flex-1 border-b-2 border-[#051036]/20 md:block"></div>
                        <div
                            className={`${kaushan.className} text-primary text-center text-3xl md:pr-2 md:text-6xl`}
                        >
                            Beer Styles
                        </div>
                        <div className="hidden flex-1 border-b-2 border-[#051036]/20 md:block"></div>
                    </div>
                </div>
                <div className="mx-auto flex w-[1280px] flex-col space-y-5 rounded-2xl bg-white p-10 shadow">
                    <p>
                        Understanding beer styles isn't just about knowing
                        what's in your glass — it's about exploring the artistry
                        behind every pint. Each style is defined by key
                        characteristics such as appearance, aroma, flavor, and
                        mouthfeel. These traits are influenced by ingredients
                        like malted grains, hops, yeast, and water, as well as
                        brewing techniques and regional preferences.
                    </p>
                    <p>
                        No matter where you are on your beer journey,
                        understanding styles empowers you to choose the perfect
                        beer for any occasion, pair it with your favorite foods,
                        or simply enjoy it as the brewer intended. So, grab your
                        favorite glass and let’s embark on a flavorful journey
                        through the fascinating world of beer!
                    </p>
                    <p>
                        At Wikibeerdia, we use a number of different methods to
                        define our styles, split into a variety of categories.
                        For each style, we have described, to the best of our
                        knowledge, a bit about the style, the main region that
                        the style was originally from, as well as the ABV and
                        IBU range for each style. We hope that this allows you
                        to learn more around how we define beers.
                    </p>
                    <p>
                        When enjoying or learning about beer, you may come
                        across the terms ABV and IBU. These are two important
                        metrics that help describe the characteristics of a
                        beer.
                    </p>
                    <h1 className="text-xl font-bold">
                        ABV (Alcohol By Volume)
                    </h1>
                    <p>
                        ABV stands for "Alcohol By Volume" and measures the
                        amount of alcohol in a beer as a percentage of the total
                        liquid volume. For example, a beer with 5% ABV means
                        that 5% of the liquid in the bottle or glass is pure
                        alcohol. In other words, the ABV gives you an idea of
                        the beer's strength and how much alcohol it contains.
                    </p>
                    <h2 className="font-semibold">Ranges:</h2>
                    <div className="ml-14">
                        <ul className="list-disc">
                            <li>
                                Light beers often have an ABV of around 3-4%
                            </li>
                            <li>
                                Craft and specialty beers might range from 5-10%
                                or higher
                            </li>
                            <li>
                                Strong beers, such as some stouts or
                                barleywines, can exceed 12% ABV
                            </li>
                        </ul>
                    </div>
                    <h1 className="text-xl font-bold">
                        IBU (International Bitterness Units)
                    </h1>
                    <p>
                        IBU stands for "International Bitterness Units" and
                        measures the bitterness of a beer, which comes from hops
                        used during the brewing process. The higher the IBU, the
                        more bitter the beer will taste. However, the perception
                        of bitterness can also depend on other factors, like the
                        beer's sweetness and overall balance.
                    </p>
                    <h2 className="font-semibold">Ranges:</h2>
                    <div className="ml-14">
                        <ul className="list-disc">
                            <li>
                                Light lagers typically have low IBUs, around
                                5-20
                            </li>
                            <li>
                                IPAs (India Pale Ales) often have higher IBUs,
                                ranging from 40-80 or more
                            </li>
                            <li>
                                Some extreme craft beers can exceed 100 IBUs,
                                though this is not common
                            </li>
                        </ul>
                    </div>
                    <h1 className="text-xl font-bold">
                        How They Work Together
                    </h1>
                    <p>
                        ABV and IBU are just two pieces of the puzzle when it
                        comes to beer's flavor profile. For instance:
                    </p>
                    <div className="ml-14">
                        <ul className="list-disc">
                            <li>
                                A beer with a high ABV and low IBU might taste
                                sweet and rich
                            </li>
                            <li>
                                A beer with a high IBU and moderate ABV might be
                                crisp and intensely hoppy
                            </li>
                        </ul>
                    </div>
                    <p>
                        Understanding ABV and IBU can help you choose beers that
                        suit your taste preferences and appreciate the craft of
                        brewing!
                    </p>
                </div>
                <div className="mx-auto grid w-[1280px] grid-cols-3 justify-center space-y-10 space-x-10">
                    {parentStyles.map((parentStyle) => {
                        return (
                            <div
                                className="flex w-[400px] flex-col space-y-10"
                                key={parentStyle.id}
                            >
                                <div className="flex h-[570px] w-[400px] flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                                    <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                                        <Beer className="text-primary mx-auto size-14" />
                                    </div>
                                    <div
                                        className={`${averia.className} text-center text-4xl`}
                                    >
                                        {parentStyle.name}
                                    </div>
                                    <div className="text-center align-top">
                                        {parentStyle.description}
                                    </div>
                                    <div>
                                        <Link
                                            href={`/education/beer-styles/${parentStyle.slug}/`}
                                        >
                                            <Button className="cursor-pointer">
                                                Read More
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                {parentStyle.styles && (
                                    <div className="h-min-[350px] flex flex-col justify-between space-y-5 rounded-2xl bg-white p-5 shadow">
                                        <ul className="pl-5">
                                            {parentStyle.styles.map(
                                                (style, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className="pb-1"
                                                        >
                                                            <Link
                                                                href={`/education/beer-styles/${parentStyle.slug}#${style.slug}`}
                                                            >
                                                                {style.name}
                                                            </Link>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary/15 flex flex-col justify-between space-y-10 py-10 sm:justify-between sm:space-x-0">
            <div className="mb-12 flex flex-col justify-center justify-items-center md:flex-row">
                <div
                    className={`${kaushan.className} text-primary flex items-center justify-center text-center text-4xl`}
                >
                    Beer Styles
                </div>
            </div>
            <div className="mx-2 flex flex-col space-y-5 rounded-2xl bg-white p-5 shadow">
                <p>
                    Understanding beer styles isn't just about knowing what's in
                    your glass — it's about exploring the artistry behind every
                    pint. Each style is defined by key characteristics such as
                    appearance, aroma, flavor, and mouthfeel. These traits are
                    influenced by ingredients like malted grains, hops, yeast,
                    and water, as well as brewing techniques and regional
                    preferences.
                </p>
                <p>
                    No matter where you are on your beer journey, understanding
                    styles empowers you to choose the perfect beer for any
                    occasion, pair it with your favorite foods, or simply enjoy
                    it as the brewer intended. So, grab your favorite glass and
                    let’s embark on a flavorful journey through the fascinating
                    world of beer!
                </p>
                <p>
                    At Wikibeerdia, we use a number of different methods to
                    define our styles, split into a variety of categories. For
                    each style, we have described, to the best of our knowledge,
                    a bit about the style, the main region that the style was
                    originally from, as well as the ABV and IBU range for each
                    style. We hope that this allows you to learn more around how
                    we define beers.
                </p>
                <p>
                    When enjoying or learning about beer, you may come across
                    the terms ABV and IBU. These are two important metrics that
                    help describe the characteristics of a beer.
                </p>
                <h1 className="text-xl font-bold">ABV (Alcohol By Volume)</h1>
                <p>
                    ABV stands for "Alcohol By Volume" and measures the amount
                    of alcohol in a beer as a percentage of the total liquid
                    volume. For example, a beer with 5% ABV means that 5% of the
                    liquid in the bottle or glass is pure alcohol. In other
                    words, the ABV gives you an idea of the beer's strength and
                    how much alcohol it contains.
                </p>
                <h2 className="font-semibold">Ranges:</h2>
                <div className="ml-14">
                    <ul className="list-disc">
                        <li>Light beers often have an ABV of around 3-4%</li>
                        <li>
                            Craft and specialty beers might range from 5-10% or
                            higher
                        </li>
                        <li>
                            Strong beers, such as some stouts or barleywines,
                            can exceed 12% ABV
                        </li>
                    </ul>
                </div>
                <h1 className="text-xl font-bold">
                    IBU (International Bitterness Units)
                </h1>
                <p>
                    IBU stands for "International Bitterness Units" and measures
                    the bitterness of a beer, which comes from hops used during
                    the brewing process. The higher the IBU, the more bitter the
                    beer will taste. However, the perception of bitterness can
                    also depend on other factors, like the beer's sweetness and
                    overall balance.
                </p>
                <h2 className="font-semibold">Ranges:</h2>
                <div className="ml-14">
                    <ul className="list-disc">
                        <li>
                            Light lagers typically have low IBUs, around 5-20
                        </li>
                        <li>
                            IPAs (India Pale Ales) often have higher IBUs,
                            ranging from 40-80 or more
                        </li>
                        <li>
                            Some extreme craft beers can exceed 100 IBUs, though
                            this is not common
                        </li>
                    </ul>
                </div>
                <h1 className="text-xl font-bold">How They Work Together</h1>
                <p>
                    ABV and IBU are just two pieces of the puzzle when it comes
                    to beer's flavor profile. For instance:
                </p>
                <div className="ml-14">
                    <ul className="list-disc">
                        <li>
                            A beer with a high ABV and low IBU might taste sweet
                            and rich
                        </li>
                        <li>
                            A beer with a high IBU and moderate ABV might be
                            crisp and intensely hoppy
                        </li>
                    </ul>
                </div>
                <p>
                    Understanding ABV and IBU can help you choose beers that
                    suit your taste preferences and appreciate the craft of
                    brewing!
                </p>
            </div>
            <div className="flex flex-col justify-center space-y-10">
                {parentStyles.map((parentStyle) => {
                    return (
                        <div
                            className="mx-2 flex flex-col space-y-10"
                            key={parentStyle.id}
                        >
                            <div className="flex h-full flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-5 shadow">
                                <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                                    <Beer className="text-primary mx-auto size-14" />
                                </div>
                                <div
                                    className={`${averia.className} text-center text-4xl`}
                                >
                                    {parentStyle.name}
                                </div>
                                <div className="text-center">
                                    {parentStyle.description}
                                </div>
                                <div>
                                    <Link
                                        href={`/education/beer-styles/${parentStyle.slug}/`}
                                    >
                                        <Button>Read More</Button>
                                    </Link>
                                </div>
                                {parentStyle.styles && (
                                    <div className="w-full">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                        >
                                            <AccordionItem
                                                value="item-1"
                                                className={cn("border-b-0")}
                                            >
                                                <AccordionTrigger>
                                                    Show styles
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="pl-5">
                                                        {parentStyle.styles.map(
                                                            (style) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            style.id
                                                                        }
                                                                        className="pb-1"
                                                                    >
                                                                        <Link
                                                                            href={`/education/beer-styles/${parentStyle.slug}#${style.slug}`}
                                                                            scroll={
                                                                                true
                                                                            }
                                                                        >
                                                                            {
                                                                                style.name
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default StylesSection;
