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
                            {`${data.beers.length} beer${data.beers.length !== 1 && "s"}`}
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
                            {`${rating} (${data.breweryReviews.length})`}
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
                {/* <div className="w-1/3 px-2">
                    <div className="sticky top-0 w-full bg-[url('/sidebackground.svg')] p-7">
                        <div className="rounded-lg bg-white p-7">
                            <Image
                                src={data.logoUrl}
                                alt={`${data.name} logo`}
                                width={100}
                                height={100}
                                className="mx-auto"
                            />
                            <div className="mt-6">
                                <div className="flex items-center justify-center">
                                    <Link
                                        href={data.website}
                                        target="_blank"
                                        className={cn(
                                            "text-xl font-medium hover:underline"
                                        )}
                                    >
                                        {data.name}
                                    </Link>
                                </div>
                                <ul className="mt-4 flex list-none items-center justify-center">
                                    <li className="px-3">
                                        <Link
                                            href={data.website}
                                            target="_blank"
                                        >
                                            <ExternalLink className="h-5 w-5 hover:text-primary" />
                                        </Link>
                                    </li>
                                </ul>
                                <Separator className="my-10" />
                                <ul className="list-none">
                                    <li>
                                        Location:
                                        <span className="float-right font-medium">{`${data.region}, ${data.country.name}`}</span>
                                    </li>
                                    <li className="pt-6">
                                        Brewery Type:
                                        <span className="float-right font-medium">
                                            {data.breweryType.name}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
};
export default BreweryMain;
