import Image from "next/image";

import TastingHero from "@/components/education/TastingHero";

const BeerTastingPage = () => {
    return (
        <div className="bg-primary-foreground/15 pb-16">
            <TastingHero />
            <div className="mx-3 mt-20 flex flex-col justify-center rounded-2xl bg-white p-10 align-middle">
                <div className="container flex flex-row justify-between space-x-10 px-36 pt-36">
                    <div className="flex h-full flex-col">
                        <div className="text-4xl font-semibold">01.</div>
                        <div className="mx-auto mt-5 h-96 border-l-2 border-dashed border-l-slate-400"></div>
                    </div>
                    <div className="flex h-full w-2/5 flex-col space-y-5">
                        <div className="text-4xl font-semibold">
                            Appearance: Feast Your Eyes
                        </div>
                        <div className="space-y-5">
                            <p>
                                Pour the beer into a clear glass and take a
                                moment to observe its color, clarity, and head
                                (foam).
                            </p>
                            <ul className="ml-10 list-disc space-y-3">
                                <li>
                                    Color: Is it golden, amber, ruby, or deep
                                    brown? The hue gives hints about the malt
                                    and ingredients used.
                                </li>
                                <li>
                                    Clarity: Is it crystal clear, hazy, or
                                    cloudy? This can indicate the brewing style
                                    and filtration process.
                                </li>
                                <li>
                                    Head: Note the foam's texture and how it
                                    lingers—this reflects the beer's carbonation
                                    and quality.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex h-full w-2/5 flex-col space-y-5">
                        <Image
                            src="/images/tasting-paddle.jpg"
                            width={550}
                            height={500}
                            alt="Tasting paddle"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                            className="my-auto w-full rounded-2xl object-cover"
                        />
                    </div>
                </div>
                <div className="container flex flex-row justify-between space-x-10 px-36 pt-10">
                    <div className="flex h-full flex-col">
                        <div className="text-4xl font-semibold">01.</div>
                        <div className="mx-auto mt-5 h-96 border-l-2 border-dashed border-l-slate-400"></div>
                    </div>
                    <div className="flex h-full w-2/5 flex-col space-y-5">
                        <div className="text-4xl font-semibold">
                            Appearance: Feast Your Eyes
                        </div>
                        <div className="space-y-5">
                            <p>
                                Pour the beer into a clear glass and take a
                                moment to observe its color, clarity, and head
                                (foam).
                            </p>
                            <ul className="ml-10 list-disc space-y-3">
                                <li>
                                    Color: Is it golden, amber, ruby, or deep
                                    brown? The hue gives hints about the malt
                                    and ingredients used.
                                </li>
                                <li>
                                    Clarity: Is it crystal clear, hazy, or
                                    cloudy? This can indicate the brewing style
                                    and filtration process.
                                </li>
                                <li>
                                    Head: Note the foam's texture and how it
                                    lingers—this reflects the beer's carbonation
                                    and quality.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex h-full w-2/5 flex-col space-y-5">
                        <Image
                            src="/images/tasting-paddle.jpg"
                            width={550}
                            height={500}
                            alt="Tasting paddle"
                            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                            className="my-auto w-full rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BeerTastingPage;
