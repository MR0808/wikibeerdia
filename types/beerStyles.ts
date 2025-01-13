import { Status } from "@prisma/client";

export interface BeerStylesTableActionProps {
    parentStyles: ParentStyle[]
}

export interface ParentStyle {
    id: string;
    name: string;
}

export interface BeerStyle {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    status: Status;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    region: string[];
    abvLow: string | null;
    abvHigh: string | null;
    ibuLow: string | null;
    ibuHigh: string | null;
    parentStyleId: string;
    parentStyle: {
        id: string;
        name: string;
    };

};