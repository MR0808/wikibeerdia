"use client";

import Link from "next/link";

import { BeersAZAlphabetProps } from "@/types/beers";

const BeersCountryAlphabet = ({ letter }: BeersAZAlphabetProps) => {
    const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    return (
        <div className="flex flex-wrap justify-center gap-1 px-4 pt-4 text-sm md:w-[1000px] md:flex-row md:justify-between md:gap-0 md:pt-5 md:text-base">
            <Link
                href="/beers/country"
                className={`${letter === undefined ? "bg-slate-700" : "bg-primary hover:bg-primary/50"} w-7 cursor-pointer rounded-lg py-2 text-center text-white transition duration-200`}
            >
                All
            </Link>
            {alphabet.map((item) => (
                <Link
                    key={item}
                    href={`/beers/country?letter=${item}`}
                    className={`${letter === item ? "bg-slate-700" : "bg-primary hover:bg-primary/50"} w-7 cursor-pointer rounded-lg p-2 text-center text-white transition duration-200`}
                >
                    {item}
                </Link>
            ))}
        </div>
    );
};
export default BeersCountryAlphabet;
