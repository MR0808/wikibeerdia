"use client";

import { useEffect, useState } from "react";

export function useEnv() {
    const [envVars, setEnvVars] = useState<Record<string, string> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEnvVars() {
            try {
                const res = await fetch("/api/env", {
                    method: "GET",
                    credentials: "include" // Ensure cookies are sent
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch environment variables");
                }

                const data = await res.json();
                setEnvVars(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchEnvVars();
    }, []);

    return { envVars, loading, error };
}
