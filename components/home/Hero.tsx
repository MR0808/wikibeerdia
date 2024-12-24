"use client";

import { Typewriter } from "nextjs-simple-typewriter";

const Hero = () => {
    const styles = [
        "Pale Ales",
        "American Amber Ales",
        "American Red Ales",
        "India Pale Ales",
        "American IPA"
    ];
    return (
        <div className="bg-main-hero relative h-[90vh] overflow-hidden bg-center">
            <div className="h-full w-full bg-blue-950/75">
                <div className="mx-4 flex flex-wrap items-center pt-[120px] md:pt-[130px] lg:pt-[240px]">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[980px] items-center text-center">
                            <h1 className="mb-6 text-4xl leading-snug font-bold text-white uppercase sm:text-5xl sm:leading-snug lg:text-7xl lg:leading-[1.2]">
                                Find all your favourite
                            </h1>
                            <h1 className="mb-6 text-2xl leading-snug font-bold text-orange-400 uppercase sm:leading-snug md:text-4xl lg:text-6xl lg:leading-[1.2]">
                                <Typewriter
                                    words={styles}
                                    loop={0}
                                    cursor
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </h1>
                            <form className="mx-auto max-w-[850px] pt-2 md:pt-20">
                                <div className="items-center justify-between overflow-hidden rounded-lg bg-white px-2 py-3 sm:flex">
                                    <div className="mr-4 items-center pb-2 md:w-4/12 md:pb-0">
                                        <input
                                            className="w-full grow px-4 text-base text-gray-400 outline-hidden"
                                            type="text"
                                            placeholder="What beer are you looking for?"
                                        />
                                    </div>
                                    {/* <SearchSelect
                                        name="location"
                                        data={countries}
                                    />
                                    <SearchSelect name="style" data={styles} /> */}
                                    <div className="mx-auto items-center px-2 md:w-2/12 md:border-l">
                                        <button className="btn btn-accent w-full rounded-md">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Hero;
