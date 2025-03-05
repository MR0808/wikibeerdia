export type KitSubscriptionResponse = {
    subscription: {
        id: number;
        state: "active" | "inactive" | "cancelled" | "unsubscribed"; // Add other possible states if needed
        created_at: string; // ISO 8601 formatted date
        source: string | null;
        referrer: string | null;
        subscribable_id: number;
        subscribable_type: "form" | "landing_page"; // Add other types if applicable
        subscriber: {
            id: number;
        };
    };
};
