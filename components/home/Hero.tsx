"use client";

import { Typewriter } from "nextjs-simple-typewriter";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroProps } from "@/types/global";

const Hero = ({ styles }: HeroProps) => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="bg-main-hero relative h-[90vh] overflow-hidden bg-center">
            <div className="h-full w-full bg-blue-950/75">
                <div className="mx-4 flex flex-wrap items-center pt-[120px] md:pt-[130px] lg:pt-[240px]">
                    <div className="w-full px-4">
                        <div className="mx-auto flex max-w-[980px] flex-col items-center justify-center text-center">
                            <h1 className="mb-6 text-4xl leading-snug font-bold text-white uppercase sm:text-5xl sm:leading-snug lg:text-7xl lg:leading-[1.2]">
                                Find all your favourite
                            </h1>
                            <h1 className="mb-6 text-2xl leading-snug font-bold text-orange-400 uppercase sm:leading-snug md:text-4xl lg:text-6xl lg:leading-[1.2]">
                                <Typewriter
                                    words={styles}
                                    loop={0}
                                    cursor
                                    typeSpeed={150}
                                    deleteSpeed={80}
                                    delaySpeed={1000}
                                />
                            </h1>
                            <form
                                onSubmit={handleSearch}
                                className="mt-4 flex h-20 w-[750px] flex-row items-center rounded-[80px] bg-white p-2"
                            >
                                <div className="focus-within:border-primary flex h-[58px] w-full flex-row items-center justify-between rounded-4xl border border-zinc-300 pr-1 pl-6">
                                    <Input
                                        className="border-none text-base placeholder-zinc-400 shadow-none focus:border-transparent focus:ring-0 focus:outline-none focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none"
                                        placeholder="Search beers and breweries..."
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                    />
                                    <Button
                                        className={cn(
                                            "bg-primary h-12 cursor-pointer rounded-4xl px-10 py-3 text-base font-semibold text-white capitalize"
                                        )}
                                        size="lg"
                                        type="submit"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Hero;
