"use client";

import Link from "next/link";

import { BreweriesAZAlphabetProps } from "@/types/breweries";

const BreweriesAZAlphabet = ({ letter }: BreweriesAZAlphabetProps) => {
    const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];

    return (
        <div className="flex flex-wrap justify-between pt-4 text-sm md:flex-row md:text-base">
            {alphabet.map((item) => (
                <Link
                    key={item}
                    href={`/breweries/az?letter=${item}`}
                    className={`${letter === item ? "bg-slate-700" : "bg-primary hover:bg-primary/50"} w-7 cursor-pointer rounded-lg p-2 text-center text-white transition duration-200`}
                >
                    {item}
                </Link>
            ))}
        </div>
    );
};
export default BreweriesAZAlphabet;
