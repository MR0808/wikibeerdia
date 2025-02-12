"use client";
import { useEffect, useState } from "react";

export default function EnvFetcher() {
    const [envVars, setEnvVars] = useState<Record<string, string>>({});
    const [apiKey, setApiKey] = useState<string | null>(null);

    useEffect(() => {
        // Step 1: Securely fetch the API key
        fetch("/api/get-api-key")
            .then((res) => res.json())
            .then((data) => {
                if (data.apiKey) {
                    setApiKey(data.apiKey);
                } else {
                    console.error("Failed to retrieve API key.");
                }
            })
            .catch((err) => console.error("Error fetching API key:", err));
    }, []);

    useEffect(() => {
        if (!apiKey) return;

        // Step 2: Use the API key to fetch environment variables
        fetch("/api/env", {
            method: "GET",
            headers: {
                "x-api-key": apiKey // Securely send API key in headers
            }
        })
            .then((res) => res.json())
            .then((data) => setEnvVars(data))
            .catch((err) =>
                console.error("Error fetching env variables:", err)
            );
    }, [apiKey]);

    return (
        <div>
            <h2>Fetched Environment Variables</h2>
            <pre>{JSON.stringify(envVars, null, 2)}</pre>
        </div>
    );
}
