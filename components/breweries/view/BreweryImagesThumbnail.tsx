import Image from "next/image";

import { cn } from "@/lib/utils";

type PropType = {
    selected: boolean;
    index: number;
    onClick: () => void;
    src: string;
    name: string;
};

export const BreweryImagesThumbnail: React.FC<PropType> = (props) => {
    const { selected, index, onClick, src, name } = props;

    return (
        <button
            onClick={onClick}
            type="button"
            className="block h-24 min-h-24 w-24 min-w-24 md:h-32 md:min-h-32 md:w-32 md:min-w-32"
        >
            <Image
                src={src}
                width={160}
                height={160}
                sizes="100vw"
                alt={`${name} - Image ${index + 1}`}
                className={cn(
                    `h-24 min-h-24 w-24 min-w-24 rounded-xl border-2 md:h-32 md:min-h-32 md:w-32 md:min-w-32 ${selected ? "border-primary" : "border-slate-500"}`
                )}
            />
        </button>
    );
};
