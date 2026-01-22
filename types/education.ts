import { Status } from '@/generated/prisma/client';

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

export interface BeerStyles {
    description: string | null;
    status: Status;
    id: string;
    name: string;
    slug: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    styles: {
        description: string | null;
        status: Status;
        id: string;
        name: string;
        slug: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        region: string[];
        abvLow: string | null;
        abvHigh: string | null;
        ibuLow: string | null;
        ibuHigh: string | null;
        parentStyleId: string;
    }[];
}

export interface StylesSectionProps {
    parentStyles: BeerStyles[]
}

export interface StepProps {
    name: string;
    step: number;
    description: string;
    image: string;
}

export interface ParentStylesHeroProps {
    image: string | null
    headline: string | null
    name: string
}