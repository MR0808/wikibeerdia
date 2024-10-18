export interface BreweriesForm {
    id: string;
    name: string;
}

export interface ParentStylesForm {
    id: string;
    name: string;
}

export interface StylesForm {
    name: string;
    id: string;
    subStyles: {
        name: string;
        id: string;
    }[];
}

export interface BeerSubmitSearchParams {
    brewery?: string;
}
