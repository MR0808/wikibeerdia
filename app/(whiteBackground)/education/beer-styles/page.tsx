import Image from "next/image";

import StylesHero from "@/components/education/StylesHero";
import { averia, kaushan } from "@/app/fonts";

const BeerStylesPage = () => {
    return (
        <div className="bg-[#FFFFF5]">
            <StylesHero />
            <div className="md:mt-20pb-10 container mt-10 flex flex-col justify-between sm:justify-between sm:space-x-0">
                <div className="flex flex-col justify-between md:flex-row">
                    <div className="mb-10 text-center text-xl font-semibold italic md:hidden">
                        "Beer is more than just a drink — it's a story of
                        culture, tradition, and craftsmanship"
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image
                            src="/images/beertypes.jpg"
                            alt="Beer styles"
                            width={500}
                            height={500}
                            className="ease rounded-2xl object-cover object-center"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                    <div className="mt-10 flex flex-col items-center justify-center justify-items-center space-y-10 md:mt-0 md:w-1/2">
                        <div className="hidden text-center text-5xl font-semibold italic md:block">
                            "Beer is more than just a drink — it's a story of
                            culture, tradition, and craftsmanship"
                        </div>
                        <div className="items-center space-y-5 text-left text-base md:w-4/5">
                            <p>
                                Whether you're a seasoned enthusiast or just
                                beginning your journey, understanding beer
                                styles enhances your appreciation for every sip.
                                Beer is one of the oldest and most diverse
                                beverages in the world, with a history that
                                dates back thousands of years.
                            </p>
                            <p>
                                Each beer style tells a story of its origin, the
                                people who created it, and the cultural
                                traditions that shaped it. From the crisp lagers
                                of Germany to the bold IPAs born out of British
                                and American ingenuity, beer reflects the
                                ingenuity and passion of its brewers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#F7F8F9]">
                <div className="container flex flex-col justify-between py-24 sm:justify-between sm:space-x-0 md:mt-20">
                    <div className="flex flex-col justify-center justify-items-center md:flex-row">
                        <div
                            className={`${kaushan.className} text-primary text-6xl`}
                        >
                            Beer Styles
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BeerStylesPage;
