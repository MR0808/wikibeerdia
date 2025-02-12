"use client";

import { useEffect, useState } from "react";

export function ApiKeyProvider() {
    const [apiKeySet, setApiKeySet] = useState<boolean>(false);

    useEffect(() => {
        async function checkAndSetApiKey() {
            try {
                const res = await fetch("/api/check-api-key", {
                    credentials: "include"
                });
                const data = await res.json();
                if (!data.valid) {
                    await fetch("/api/set-api-key");
                }

                setApiKeySet(true);
            } catch (error) {
                console.error("Failed to check/set API key", error);
            }
        }
        checkAndSetApiKey();
    }, []);

    return null; // This component doesn't render anything, just runs logic
}
