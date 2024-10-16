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
            className="block w-full min-w-32 md:h-40 md:w-auto"
        >
            <Image
                src={src}
                width={160}
                height={160}
                sizes="100vw"
                alt={`${name} - Image ${index + 1}`}
                className={cn(
                    `h-24 w-full rounded-xl md:h-[160px] md:w-auto ${selected && "border-2 border-primary"}`
                )}
            />
        </button>
    );
};
