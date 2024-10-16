import Image from "next/image";
import { Factory, Beer, Earth, Star } from "lucide-react";

import { BreweryType } from "@/types/breweries";

const BreweryMain = ({ data }: { data: BreweryType }) => {
    const ratings = data.breweryReviews.map((review) => {
        return review.rating;
    });

    let rating = 0;

    if (ratings.length > 0)
        rating = ratings.reduce((a, b) => a + b) / ratings.length;

    return (
        <>
            <div className="mt-12 h-auto w-full items-center rounded-lg bg-white p-10 align-middle shadow-lg md:mt-16">
                <ul className="-mx-2 flex list-none flex-wrap items-center justify-center">
                    <li className="relative w-1/6 p-2 text-base">&nbsp;</li>
                    <li className="relative w-1/5 p-2 text-base">
                        <Factory className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {data.breweryType.name}
                        </span>
                    </li>
                    <li className="relative w-1/5 p-2 text-base before:absolute before:-left-1/4 before:h-20 before:w-[1px] before:-translate-x-1/2 before:rotate-[17deg] before:bg-black before:opacity-40 before:content-['']">
                        <Beer className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {`${data.beers.length} beer${data.beers.length !== 1 && "s"}`}
                        </span>
                    </li>
                    <li className="relative w-1/5 p-2 text-base before:absolute before:-left-1/4 before:h-20 before:w-[1px] before:-translate-x-1/2 before:rotate-[17deg] before:bg-black before:opacity-40 before:content-['']">
                        <Earth className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {data.country.name}
                        </span>
                    </li>
                    <li className="relative w-1/5 p-2 text-base before:absolute before:-left-1/4 before:h-20 before:w-[1px] before:-translate-x-1/2 before:rotate-[17deg] before:bg-black before:opacity-40 before:content-['']">
                        <Star className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {`${rating} (${data.breweryReviews.length})`}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="mt-12 flex flex-row md:mt-16 md:space-x-3">
                <div className="w-full pt-1 sm:w-2/3 md:w-3/4">
                    <div className="mb-5 h-auto w-full rounded-lg bg-white p-5 shadow-lg md:mb-20">
                        <h4 className="mb-5 text-4xl">{`"${data.headline}"`}</h4>
                        <p className="whitespace-pre-wrap text-lg">
                            {data.description}
                        </p>
                    </div>
                </div>
                <div className="w-full px-2 sm:w-1/3 md:w-1/4">
                    <div className="sticky top-0 w-full rounded-xl bg-white p-4"></div>
                </div>
            </div>
        </>
    );
};
export default BreweryMain;
