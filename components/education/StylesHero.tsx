import Image from "next/image";

import { averia } from "@/app/fonts";

const StylesHero = () => {
    return (
        <div className="bg-[#746C60] pb-5 drop-shadow-lg md:h-[550px] md:pb-0">
            <div className="container flex flex-col bg-[#746C60] pt-20 md:flex-row">
                <div className="order-last flex flex-wrap items-center justify-between md:order-first md:w-1/2">
                    <div className="flex flex-col space-y-5 text-center md:w-4/5 md:space-y-10 md:text-left">
                        <h1
                            className={`${averia.className} text-4xl leading-snug font-bold text-white uppercase sm:leading-snug md:text-6xl md:leading-[1.2]`}
                        >
                            Uncover the rich world of beer styles
                        </h1>
                        <h2
                            className={`${averia.className} text-xl leading-snug text-white lg:leading-[1.7]`}
                        >
                            From crisp lagers to hoppy ales, explore the
                            flavors, history, and brewing techniques behind
                            every pint.
                        </h2>
                    </div>
                </div>
                <div className="h-fit bg-[#746C60] pt-2 pb-5 md:w-1/2 md:pt-10 md:pb-0">
                    <Image
                        src="/images/bg-styles.jpg"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }} // optional
                        alt="Beer styles"
                        className="bg-gradient-to-br to-[#746C60]"
                    />
                </div>
            </div>
        </div>
    );
};
export default StylesHero;
