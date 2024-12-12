export interface ReviewsType {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
        id: string;
        displayName: string | null;
        image: string | null;
    };
}
