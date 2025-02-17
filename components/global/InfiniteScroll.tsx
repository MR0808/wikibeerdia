"use client";

import { LoaderCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";

type Props = {
    typeLoading: string;
    isLoadingIntial: boolean;
    isLoadingMore: boolean;
    children: React.ReactNode;
    loadMore: () => void;
};

function InfiniteScroll(props: Props) {
    const observerElement = useRef<HTMLDivElement | null>(null);
    const { isLoadingIntial, isLoadingMore, children, loadMore, typeLoading } =
        props;

    useEffect(() => {
        // is element in view?
        function handleIntersection(entries: IntersectionObserverEntry[]) {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    (!isLoadingMore || !isLoadingIntial)
                ) {
                    loadMore();
                }
            });
        }

        // create observer instance
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: "100px",
            threshold: 0
        });

        if (observerElement.current) {
            observer.observe(observerElement.current);
        }

        // cleanup function
        return () => observer.disconnect();
    }, [isLoadingMore, isLoadingIntial, loadMore]);

    return (
        <>
            <>{children}</>

            <div ref={observerElement} id="obs">
                {isLoadingMore && !isLoadingIntial && (
                    <div className="wrapper flex h-20 flex-col items-center justify-center">
                        <div>Loading more {typeLoading}...</div>

                        <LoaderCircle className="animate-spin" />
                    </div>
                )}
            </div>
        </>
    );
}

export default InfiniteScroll;
