"use client";

import { useEffect, useState } from "react";

export function useApiKey() {
    const [apiKeySet, setApiKeySet] = useState<boolean>(false);

    useEffect(() => {
        async function checkAndSetApiKey() {
            // Check if the cookie is already set
            const res = await fetch("/api/check-api-key", {
                credentials: "include"
            });
            const data = await res.json();

            if (!data.valid) {
                // If API key is missing, call the API to set it
                await fetch("/api/set-api-key");
            }
            setApiKeySet(true);
        }

        checkAndSetApiKey();
    }, []);

    return { apiKeySet };
}
