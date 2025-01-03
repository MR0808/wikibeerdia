import Image from "next/image";
import { MoveRight, ArrowBigRight } from "lucide-react";

import { averia } from "@/app/fonts";

const ProcessHero = () => {
    return (
        <div className="h-full pb-2 drop-shadow-lg md:pb-0">
            <div className="container flex flex-row justify-between space-x-5 pt-24">
                <div className="h-fit pt-2 pb-5 md:pt-10 md:pb-0">
                    <Image
                        src="/images/ingredients.png"
                        width={400}
                        height={400}
                        sizes="100vw"
                        alt="Beer ingredients"
                    />
                </div>
                <div className="flex flex-col items-center pt-10 align-bottom">
                    <Image
                        src="/images/arrow.png"
                        width={250}
                        height={200}
                        sizes="100vw"
                        alt="Arrow"
                        className="my-auto"
                    />
                </div>
                <div className="h-fit pt-2 pb-5 md:pt-10 md:pb-0">
                    <Image
                        src="/images/finished-beer.png"
                        width={400}
                        height={400}
                        sizes="100vw"
                        alt="Beer ingredients"
                    />
                </div>
            </div>
            <div className="container mt-5 space-y-4">
                <h1
                    className={`${averia.className} text-center text-4xl leading-snug font-bold text-slate-600 uppercase drop-shadow-2xl sm:leading-snug md:text-6xl md:leading-[1.2]`}
                >
                    From hops and grains to the nectar of the gods
                </h1>
                <h2
                    className={`${averia.className} text-center text-3xl leading-snug font-bold text-slate-600 uppercase drop-shadow-2xl sm:leading-snug md:text-4xl md:leading-[1.2]`}
                >
                    Let's explore how beer is made
                </h2>
            </div>
        </div>
    );
};
export default ProcessHero;
