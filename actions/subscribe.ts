"use server";

import { KitSubscriptionResponse } from "@/types/subscribe";

export async function subscribeToNewsletter(email: string) {
    const API_KEY = process.env.KIT_API_KEY;
    const FORM_ID = process.env.KIT_FORM_ID; // Replace with your ConvertKit form ID

    if (!API_KEY || !FORM_ID) {
        throw new Error("ConvertKit API key or Form ID is missing.");
    }

    const response = await fetch(
        `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: API_KEY,
                email
            })
        }
    );

    const data: KitSubscriptionResponse = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.subscription
                ? "Failed to subscribe."
                : "Invalid response from server."
        );
    }

    return data;
}
