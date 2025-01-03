import Image from "next/image";

import { averia } from "@/app/fonts";

const LagerHero = () => {
    return (
        <div className="bg-[#746C60] pb-5 drop-shadow-lg md:h-[500px] md:pb-0">
            <div className="container flex h-full flex-col bg-[#746C60] pt-20 md:flex-row md:space-x-10">
                <div className="h-fit justify-items-center pt-2 pb-5 md:w-3/5 md:pt-10 md:pb-0">
                    <Image
                        src="/images/lager-bg.png"
                        width={350}
                        height={350}
                        sizes="100vw"
                        className="h-full"
                        alt="Lager beers"
                    />
                </div>
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-col space-y-5 text-center md:w-4/5 md:space-y-10 md:text-left">
                        <h1
                            className={`${averia.className} text-4xl leading-snug font-bold text-white uppercase sm:leading-snug md:text-6xl md:leading-[1.2]`}
                        >
                            What is a Lager?
                        </h1>
                        <h2
                            className={`${averia.className} text-xl leading-snug text-white lg:leading-[1.7]`}
                        >
                            The most widely consumed beer style in the world,
                            prized for its clean, crisp flavors and smooth
                            finish
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LagerHero;
