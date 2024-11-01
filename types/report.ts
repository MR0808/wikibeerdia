export interface ReportType {
    comment: string;
    userId?: string;
    type: "BEER" | "BREWERY" | "BREWERYREVIEW" | "BEERREVIEW";
    beerId?: string;
    breweryId?: string;
    beerReviewId?: string;
    breweryReviewId?: string;
}
