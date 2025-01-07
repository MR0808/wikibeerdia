import Image from "next/image";
import parse from "html-react-parser";

import { StepProps } from "@/types/education";

const TastingSteps = ({ name, step, description, image }: StepProps) => {
    return (
        <div className="container flex flex-row justify-between space-x-10 px-36 pt-20">
            <div className="flex h-full flex-col">
                <div className="text-4xl font-semibold">{`0${step}.`}</div>
                <div className="mx-auto mt-5 h-96 border-l-2 border-dashed border-l-slate-400"></div>
            </div>
            <div className="flex h-full w-2/5 flex-col space-y-5">
                <div className="text-4xl font-semibold">{name}</div>
                <div className="space-y-5">{parse(description)}</div>
            </div>
            <div className="flex h-full w-2/5 flex-col space-y-5">
                <Image
                    src={image}
                    width={550}
                    height={500}
                    alt={name}
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    className="my-auto w-full rounded-2xl object-cover"
                />
            </div>
        </div>
    );
};
export default TastingSteps;
