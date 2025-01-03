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

const StylesSection = ({
    aleStyles,
    lagerStyles,
    hybridStyles
}: StylesSectionProps) => {
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
                        At Wikibeerdia, we use the styles as listed by the{" "}
                        <a
                            href="https://www.brewersassociation.org/"
                            target="_blank"
                            className="text-primary hover:text-slate-500 hover:underline"
                            rel="noopener"
                        >
                            Brewers Association
                        </a>{" "}
                        on their{" "}
                        <a
                            href="https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/"
                            target="_blank"
                            className="text-primary hover:text-slate-500 hover:underline"
                            rel="noopener"
                        >
                            Brewers Association Beer Style Guidelines
                        </a>
                        . Below you will see the three main styles of beers, and
                        their respective sub styles.
                    </p>
                </div>
                <div className="flex flex-row justify-center space-x-10">
                    <div className="flex w-[400px] flex-col space-y-10">
                        <div className="flex h-[570px] w-[400px] flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                            <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                                <Beer className="text-primary mx-auto size-14" />
                            </div>
                            <div
                                className={`${averia.className} text-center text-4xl`}
                            >
                                Ales
                            </div>
                            <div className="text-center">
                                Ales are warm-fermented beers with bold, complex
                                flavors, often featuring fruity, spicy, or
                                floral notes. This diverse category includes
                                styles like IPAs, stouts, and pale ales, making
                                it ideal for those seeking rich and varied beer
                                experiences.
                            </div>
                            <div>
                                <Link href="/education/beer-styles/ales/">
                                    <Button className="cursor-pointer">
                                        Read More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {aleStyles && (
                            <div className="h-min-[350px] flex flex-col justify-between space-y-5 rounded-2xl bg-white p-5 shadow">
                                {aleStyles.map((style, index) => {
                                    return (
                                        <div key={index}>
                                            <h3 className="pb-2 font-semibold">
                                                {style.name}
                                            </h3>
                                            <ul className="pl-5">
                                                {style.subStyles &&
                                                    style.subStyles.map(
                                                        (subStyle, index) => {
                                                            return (
                                                                <li
                                                                    key={index}
                                                                    className="pb-1"
                                                                >
                                                                    <Link
                                                                        href={`/education/beer-styles/ales#${subStyle.slug}`}
                                                                    >
                                                                        {
                                                                            subStyle.name
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="flex w-[400px] flex-col space-y-10">
                        <div className="flex h-[570px] w-[400px] flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                            <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                                <Beer className="text-primary mx-auto size-14" />
                            </div>
                            <div
                                className={`${averia.className} text-center text-4xl`}
                            >
                                Lagers
                            </div>
                            <div className="text-center">
                                Lagers are cold-fermented beers known for their
                                clean, crisp, and refreshing taste with balanced
                                malt and hop profiles. Popular styles like
                                pilsners and bocks appeal to a wide audience
                                with their smooth and approachable flavors.
                            </div>
                            <div>
                                <Link href="/education/beer-styles/lager/">
                                    <Button className="cursor-pointer">
                                        Read More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {lagerStyles && (
                            <div className="h-min-[350px] flex w-[400px] flex-col justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                                {lagerStyles.map((style, index) => {
                                    return (
                                        <div key={index}>
                                            <h3 className="pb-2 font-semibold">
                                                {style.name}
                                            </h3>
                                            <ul className="pl-5">
                                                {style.subStyles &&
                                                    style.subStyles.map(
                                                        (subStyle, index) => {
                                                            return (
                                                                <li
                                                                    key={index}
                                                                    className="pb-1"
                                                                >
                                                                    <Link
                                                                        href={`/education/beer-styles/lager#${subStyle.slug}`}
                                                                    >
                                                                        {
                                                                            subStyle.name
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className="flex w-[400px] flex-col space-y-10">
                        <div className="flex h-[570px] w-[400px] flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                            <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                                <Beer className="text-primary mx-auto size-14" />
                            </div>
                            <div
                                className={`${averia.className} text-center text-4xl`}
                            >
                                Hybrid/Mixed
                            </div>
                            <div className="text-center">
                                Hybrid beer styles combine techniques from both
                                ales and lagers, creating a balance of
                                characteristics from each. They often feature
                                the fruity notes of ales alongside the clean,
                                crisp finish of lagers, offering a unique and
                                versatile flavor profile.
                            </div>
                            <div>
                                <Link href="/education/beer-styles/hybrid-mixed/">
                                    <Button className="cursor-pointer">
                                        Read More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {hybridStyles && (
                            <div className="h-min-[350px] flex w-[400px] flex-col justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                                {hybridStyles.map((style, index) => {
                                    return (
                                        <div key={index}>
                                            <h3 className="pb-2 font-semibold">
                                                {style.name}
                                            </h3>
                                            <ul className="pl-5">
                                                {style.subStyles &&
                                                    style.subStyles.map(
                                                        (subStyle, index) => {
                                                            return (
                                                                <li
                                                                    key={index}
                                                                    className="pb-1"
                                                                >
                                                                    <Link
                                                                        href={`/education/beer-styles/hybrid-mixed#${subStyle.slug}`}
                                                                    >
                                                                        {
                                                                            subStyle.name
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
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
                    At Wikibeerdia, we use the styles as listed by the{" "}
                    <a
                        href="https://www.brewersassociation.org/"
                        target="_blank"
                        className="text-primary hover:text-slate-500 hover:underline"
                        rel="noopener"
                    >
                        Brewers Association
                    </a>{" "}
                    on their{" "}
                    <a
                        href="https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/"
                        target="_blank"
                        className="text-primary hover:text-slate-500 hover:underline"
                        rel="noopener"
                    >
                        Brewers Association Beer Style Guidelines
                    </a>
                    . Below you will see the three main styles of beers, and
                    their respective sub styles.
                </p>
            </div>
            <div className="flex flex-col justify-center space-y-10">
                <div className="mx-2 flex flex-col space-y-10">
                    <div className="flex h-full flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-5 shadow">
                        <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                            <Beer className="text-primary mx-auto size-14" />
                        </div>
                        <div
                            className={`${averia.className} text-center text-4xl`}
                        >
                            Ales
                        </div>
                        <div className="text-center">
                            Ales are warm-fermented beers with bold, complex
                            flavors, often featuring fruity, spicy, or floral
                            notes. This diverse category includes styles like
                            IPAs, stouts, and pale ales, making it ideal for
                            those seeking rich and varied beer experiences.
                        </div>
                        <div>
                            <Link href="/education/beer-styles/ales/">
                                <Button>Read More</Button>
                            </Link>
                        </div>
                        {aleStyles && (
                            <div className="w-full">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            Show styles
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {aleStyles.map((style, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h3 className="pb-2 font-semibold">
                                                            {style.name}
                                                        </h3>
                                                        <ul className="pl-5">
                                                            {style.subStyles &&
                                                                style.subStyles.map(
                                                                    (
                                                                        subStyle,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="pb-1"
                                                                            >
                                                                                <Link
                                                                                    href={`/education/beer-styles/ales#${subStyle.slug}`}
                                                                                >
                                                                                    {
                                                                                        subStyle.name
                                                                                    }
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mx-2 flex flex-col space-y-10">
                    <div className="flex w-full flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                        <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                            <Beer className="text-primary mx-auto size-14" />
                        </div>
                        <div
                            className={`${averia.className} text-center text-4xl`}
                        >
                            Lagers
                        </div>
                        <div className="text-center">
                            Lagers are cold-fermented beers known for their
                            clean, crisp, and refreshing taste with balanced
                            malt and hop profiles. Popular styles like pilsners
                            and bocks appeal to a wide audience with their
                            smooth and approachable flavors.
                        </div>
                        <div>
                            <Link href="/education/beer-styles/lager/">
                                <Button>Read More</Button>
                            </Link>
                        </div>
                        {lagerStyles && (
                            <div className="w-full">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            Show styles
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {lagerStyles.map((style, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h3 className="pb-2 font-semibold">
                                                            {style.name}
                                                        </h3>
                                                        <ul className="pl-5">
                                                            {style.subStyles &&
                                                                style.subStyles.map(
                                                                    (
                                                                        subStyle,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="pb-1"
                                                                            >
                                                                                <Link
                                                                                    href={`/education/beer-styles/lager#${subStyle.slug}`}
                                                                                >
                                                                                    {
                                                                                        subStyle.name
                                                                                    }
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mx-2 flex flex-col space-y-10">
                    <div className="flex w-full flex-col items-center justify-between space-y-5 rounded-2xl bg-white p-10 shadow">
                        <div className="bg-primary/15 size-28 content-center items-center justify-center rounded-full">
                            <Beer className="text-primary mx-auto size-14" />
                        </div>
                        <div
                            className={`${averia.className} text-center text-4xl`}
                        >
                            Hybrid/Mixed
                        </div>
                        <div className="text-center">
                            Hybrid beer styles combine techniques from both ales
                            and lagers, creating a balance of characteristics
                            from each. They often feature the fruity notes of
                            ales alongside the clean, crisp finish of lagers,
                            offering a unique and versatile flavor profile.
                        </div>
                        <div>
                            <Link href="/education/beer-styles/hybrid-mixed/">
                                <Button>Read More</Button>
                            </Link>
                        </div>
                        {hybridStyles && (
                            <div className="w-full">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            Show styles
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {hybridStyles.map(
                                                (style, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <h3 className="pb-2 font-semibold">
                                                                {style.name}
                                                            </h3>
                                                            <ul className="pl-5">
                                                                {style.subStyles &&
                                                                    style.subStyles.map(
                                                                        (
                                                                            subStyle,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="pb-1"
                                                                                >
                                                                                    <Link
                                                                                        href={`/education/beer-styles/hybrid-mixed#${subStyle.slug}`}
                                                                                    >
                                                                                        {
                                                                                            subStyle.name
                                                                                        }
                                                                                    </Link>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StylesSection;
