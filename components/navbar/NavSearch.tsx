"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

const NavSearch = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg border-2 border-gray-300 bg-gray-50 text-gray-900"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
};
export default NavSearch;
