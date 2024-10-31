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
                <ul className="mx-auto flex list-none flex-wrap items-center justify-center">
                    <li className="relative hidden w-1/6 p-2 text-base md:block">
                        &nbsp;
                    </li>
                    <li className="relative mt-2 w-1/2 p-2 text-base md:mt-0 md:w-1/5">
                        <Factory className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {data.breweryType.name}
                        </span>
                    </li>
                    <li className="overview-icons">
                        <Beer className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {`${data._count.beers} beer${data._count.beers !== 1 && "s"}`}
                        </span>
                    </li>
                    <li className="overview-icons">
                        <Earth className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {data.country.name}
                        </span>
                    </li>
                    <li className="overview-icons">
                        <Star className="mb-3 h-8 w-8" />
                        <span className="text-xl text-black">
                            {rating.toFixed(1)}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="mt-12 flex flex-row md:mt-16 md:space-x-3">
                <div className="w-full">
                    <div className="h-auto w-full rounded-lg bg-white p-5 shadow-lg md:p-14">
                        <h4 className="mb-5 text-4xl">{`"${data.headline}"`}</h4>
                        <p className="whitespace-pre-wrap text-lg leading-8">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default BreweryMain;
