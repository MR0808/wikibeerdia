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
        <button onClick={onClick} type="button" className="block h-40 w-full">
            <Image
                src={src}
                width={160}
                height={160}
                alt={`${name} - Image ${index + 1}`}
                className={cn(
                    `h-[160px] w-auto rounded-xl ${selected && "rounded-xl border-2 border-primary"}`
                )}
            />
        </button>
    );
};
