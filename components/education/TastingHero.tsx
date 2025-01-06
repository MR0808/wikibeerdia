import Image from "next/image";

import { questrial } from "@/app/fonts";

const TastingHero = () => {
    return (
        <div className="flex h-full flex-row justify-center pt-36 pb-2 md:pb-0">
            <div className="mt-5 flex w-full flex-col items-center justify-center space-y-4">
                <h1
                    className={`{${questrial.className} text-center text-3xl leading-snug font-medium sm:leading-snug md:text-6xl md:leading-[1.2]`}
                >
                    The Art of Tasting Beer:
                </h1>
                <h1
                    className={`{${questrial.className} text-center text-3xl leading-snug font-medium sm:leading-snug md:text-6xl md:leading-[1.2]`}
                >
                    A Sensory Journey
                </h1>
                <h2
                    className={`{${questrial.className} w-[750px] pt-5 text-center`}
                >
                    Tasting beer is more than just sipping—it’s an experience
                    that engages all your senses. Whether you're a seasoned
                    enthusiast or a newcomer, learning to taste beer like a pro
                    can deepen your appreciation for this diverse beverage. Let
                    us guide you through the essentials of beer tasting.
                </h2>
                <div className="flex flex-col items-center pt-10 align-bottom">
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
        </div>
    );
};
export default TastingHero;
