import { arvo } from "@/app/fonts";

import AboutHero from "@/components/about/AboutHero";
import Image from "next/image";

const AboutPage = () => {
    return (
        <>
            <AboutHero />
            <div className="flex flex-col items-center space-y-20 pt-20 md:space-y-28">
                <div className="flex flex-col items-center space-y-20 px-4 text-center md:max-w-[780px] md:px-0">
                    <div
                        className={`${arvo.className} text-primary/70 text-6xl font-extrabold tracking-widest uppercase`}
                    >
                        Our Story
                    </div>
                    <div className="text-center">
                        Born out of a deep love for beer and an insatiable
                        curiosity to learn more, our online beer encyclopedia
                        was created to be the ultimate resource for beer
                        enthusiasts around the world. What started as a humble
                        passion project among friends has grown into a
                        comprehensive platform dedicated to educating,
                        inspiring, and connecting beer lovers from all walks of
                        life. We believe that beer is more than just a beverage;
                        it is a rich tapestry of history, culture,
                        craftsmanship, and community. Our mission is to
                        celebrate this diversity and provide a space where
                        knowledge and appreciation for beer can thrive. Through
                        extensive research, collaboration with brewers, and
                        engagement with beer communities, we've built an
                        ever-expanding library of information that continues to
                        evolve with the industry.
                    </div>
                </div>
                <div className="mx-auto w-[320px] rounded-2xl bg-stone-200 p-10 md:container md:p-20">
                    <div className="flex flex-col space-y-10 align-middle md:flex-row md:space-y-0 md:space-x-10">
                        <Image
                            src="/images/about1.jpg"
                            alt="Our Mission"
                            width={525}
                            height={700}
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                            className="md:h-[500px]"
                        />
                        <div className="flex flex-col items-center justify-center space-y-10 md:w-1/2 md:space-y-20">
                            <div
                                className={`${arvo.className} text-primary/70 text-center text-5xl font-extrabold tracking-widest uppercase md:text-6xl`}
                            >
                                Our Mission
                            </div>
                            <div className="text-center">
                                At the core of our mission is the desire to make
                                beer knowledge accessible to everyone. Whether
                                you're a seasoned brewmaster, a homebrewing
                                hobbyist, or simply someone who enjoys a cold
                                pint at the end of a long day, our platform is
                                designed to cater to your curiosity. We aim to
                                cover everything from the history and origins of
                                different beer styles to the science behind
                                brewing techniques and the art of pairing beer
                                with food. Our goal is to demystify the brewing
                                process and provide practical advice for
                                enthusiasts at every level. By fostering a
                                community of learning and sharing, we hope to
                                elevate the global beer culture and support the
                                craft beer movement while shining a spotlight on
                                local breweries and unique brewing traditions
                                from around the world.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full space-y-20 bg-slate-200 md:py-28">
                    <div className="flex flex-col-reverse md:container md:flex-row md:space-x-20">
                        <div className="flex flex-col items-center justify-center space-y-10 px-3 py-10 md:w-1/2 md:space-y-20 md:px-0 md:py-0">
                            <div
                                className={`${arvo.className} text-primary/70 text-center text-4xl font-extrabold tracking-widest uppercase md:text-5xl`}
                            >
                                Our Vision
                            </div>
                            <div className="text-center">
                                Our vision is to become the world’s leading
                                digital platform for beer knowledge and culture.
                                We aspire to bridge the gap between beer novices
                                and experts, creating a space where information
                                flows freely and the art of brewing is
                                celebrated globally. By continuously expanding
                                our content, collaborating with breweries, and
                                engaging with the global beer community, we aim
                                to preserve brewing traditions, support
                                innovation in the craft beer scene, and inspire
                                the next generation of brewers and enthusiasts.
                                We envision a world where everyone can
                                appreciate the craftsmanship and creativity that
                                goes into every pint.
                            </div>
                        </div>
                        <Image
                            src="/images/about3.jpg"
                            alt="Our Vision"
                            width={700}
                            height={467}
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                            className="md:w-1/2"
                        />
                    </div>
                </div>
                <div className="mb-20w-full space-y-20 md:mb-28">
                    <div className="flex flex-col md:container md:flex-row md:space-x-20">
                        <Image
                            src="/images/about2.jpg"
                            alt="Cheers to the Journey Ahead"
                            width={700}
                            height={394}
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                            className="md:w-1/2"
                        />
                        <div className="flex flex-col items-center justify-center space-y-10 px-3 py-10 md:w-1/2 md:space-y-20 md:px-0 md:py-0">
                            <div
                                className={`${arvo.className} text-primary/70 text-center text-4xl font-extrabold tracking-widest uppercase md:text-5xl`}
                            >
                                Cheers to the Journey Ahead
                            </div>
                            <div className="text-center">
                                As we continue to explore the world of beer, we
                                invite you to join us on this exciting journey.
                                From ancient brewing traditions to cutting-edge
                                craft innovations, there’s always something new
                                to discover. Whether you're savoring a classic
                                lager, experimenting with a new homebrew recipe,
                                or visiting a hidden gem brewery, every pint
                                tells a story. So grab your favorite brew, raise
                                your glass, and let’s toast to the endless
                                adventure that is beer. Cheers to learning,
                                sharing, and celebrating the amazing world of
                                beer together!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AboutPage;
