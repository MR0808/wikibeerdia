import { Status } from "@prisma/client";

export interface BeerStylesParent {
    id: string;
    name: string;
    slug: string;
    subStyles?: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        status: Status;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        styleId: string;
    }[];
}

export interface StylesSectionProps {
    aleStyles: BeerStylesParent[] | null;
    lagerStyles: BeerStylesParent[] | null;
    hybridStyles: BeerStylesParent[] | null;
}

export interface StepProps {
    name: string;
    step: number;
    description: string;
    image: string;
}
