import Image from "next/image";

import { averia } from "@/app/fonts";

const ProcessHero = () => {
    return (
        <div className="pb-5 drop-shadow-lg md:h-[550px] md:pb-0">
            <div className="container flex flex-col pt-20 md:flex-row">
                <div className="h-fit pt-2 pb-5 md:w-1/2 md:pt-10 md:pb-0">
                    <Image
                        src="/images/ingredients.png"
                        width={400}
                        height={400}
                        sizes="100vw"
                        alt="Beer ingredients"
                    />
                </div>
            </div>
        </div>
    );
};
export default ProcessHero;
