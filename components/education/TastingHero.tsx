import Image from "next/image";

import { questrial } from "@/app/fonts";

const TastingHero = () => {
    return (
        <div className="container mt-5 flex w-full flex-col-reverse items-center justify-items-center space-y-4 pt-36 md:flex-col">
            <div className="flex flex-col space-y-4">
                <h1
                    className={`${questrial.className} text-center text-3xl leading-snug font-medium sm:leading-snug md:text-6xl md:leading-[1.2]`}
                >
                    The Art of Tasting Beer:
                </h1>
                <h1
                    className={`${questrial.className} text-center text-3xl leading-snug font-medium sm:leading-snug md:text-6xl md:leading-[1.2]`}
                >
                    A Sensory Journey
                </h1>
                <h2
                    className={`${questrial.className} pt-5 text-center md:w-[750px]`}
                >
                    Tasting beer is more than just sipping—it’s an experience
                    that engages all your senses. Whether you're a seasoned
                    enthusiast or a newcomer, learning to taste beer like a pro
                    can deepen your appreciation for this diverse beverage. Let
                    us guide you through the essentials of beer tasting.
                </h2>
            </div>
            <div className="flex flex-col items-center pb-10 align-bottom md:pt-10 md:pb-0">
                <Image
                    src="/images/tasting-enjoying.jpg"
                    width={1000}
                    height={800}
                    alt="People enjoying beer"
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    className="my-auto rounded-2xl object-cover"
                />
            </div>
        </div>
    );
};
export default TastingHero;
