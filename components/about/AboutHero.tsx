"use client";

import { useState } from "react";
import { geo } from "@/app/fonts";

const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
    "/videos/video5.mp4",
    "/videos/video6.mp4"
];

const AboutHero = () => {
    const [currentVideo, setCurrentVideo] = useState(0);

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
    };
    return (
        <section className="relative h-[400px] w-full overflow-hidden pt-24 md:h-[700px]">
            <video
                key={currentVideo} // This forces re-render when video changes
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src={videos[currentVideo]} type="video/mp4" />
            </video>

            {/* Overlay Content */}
            <div
                className={`${geo.className} absolute inset-0 flex flex-col items-center justify-center space-y-20 bg-black/40 pt-10 text-white md:pt-0`}
            >
                <h1 className="hidden -skew-y-5 text-center text-7xl leading-0.5 font-bold tracking-widest uppercase md:block">
                    We Just Love Beer
                </h1>
                <h1 className="-skew-y-5 text-center text-7xl leading-0.5 font-bold tracking-widest uppercase md:hidden">
                    We Just
                </h1>
                <h1 className="-skew-y-5 text-center text-7xl leading-0.5 font-bold tracking-widest uppercase md:hidden">
                    Love Beer
                </h1>
            </div>
        </section>
    );
};
export default AboutHero;
