import Image from "next/image";

import { StepProps } from "@/types/education";

export const BeerProcessStep = ({
    name,
    step,
    description,
    image
}: StepProps) => {
    return (
        <div className="min-h-96 w-full rounded-2xl border border-black">
            <div className="relative top-0 -mt-10 -ml-9 flex-shrink-0">
                <div className="flex h-18 w-18 items-center justify-center rounded-full border-4 border-white bg-[#FCB88E] text-3xl font-semibold text-slate-600">
                    {step}
                </div>
            </div>
            <div
                className={`flex flex-col items-center space-y-5 p-3 align-middle md:space-y-0 md:space-x-10 md:p-10 ${step % 2 == 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
                <Image
                    src={image}
                    alt={name}
                    width={380}
                    height={380}
                    className="ease rounded-2xl object-cover object-center"
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                />
                <div className="flex flex-col space-y-5 pr-5">
                    <div className="text-center text-4xl font-bold md:text-left">
                        {name}
                    </div>
                    <div>{description}</div>
                </div>
            </div>
        </div>
    );
};

export const BeerSeparator = () => {
    return (
        <div className="flex h-18 flex-row md:h-36">
            <div className="w-1/2 border-r-2 border-dashed border-gray-300"></div>
            <div className="w-1/2"></div>
        </div>
    );
};
