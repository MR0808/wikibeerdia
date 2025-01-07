import Image from "next/image";
import parse from "html-react-parser";

import { StepProps } from "@/types/education";

const TastingSteps = ({ name, step, description, image }: StepProps) => {
    return (
        <div className="flex h-full flex-col justify-start px-5 pt-5 md:container md:mt-8 md:flex-row md:space-x-32 md:px-36 md:pt-20">
            <div className="hidden min-h-fit md:flex md:flex-col">
                <div className="text-4xl font-semibold">{`0${step}.`}</div>
                <div className="mx-auto mt-5 h-full border-l-2 border-dashed border-l-slate-400"></div>
            </div>
            <div className="flex h-full w-full flex-col justify-start space-y-3 md:w-2/3 md:space-y-5">
                <div className="text-2xl font-semibold md:hidden">{`0${step}.`}</div>
                <div className="text-2xl font-semibold md:block md:text-4xl">
                    {name}
                </div>
                <Image
                    src={image}
                    width={550}
                    height={300}
                    alt={name}
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    className="my-auto w-full rounded-2xl object-cover pb-5"
                />
                <div className="space-y-5">{parse(description)}</div>
            </div>
        </div>
    );
};
export default TastingSteps;
