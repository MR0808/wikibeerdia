import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const StylesHero = () => {
    return (
        <div className="bg-styles-hero relative h-96 overflow-hidden bg-fixed bg-center">
            <div className="h-full w-full bg-black/65">
                <div className="mx-4 flex flex-wrap items-center pt-[110px] md:pt-[120px] lg:pt-[180px]">
                    <div className="w-full px-4">
                        <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
                            <h1 className="text-4xl leading-snug font-bold text-white uppercase sm:text-5xl sm:leading-snug lg:text-7xl lg:leading-[1.2]">
                                Beer Styles
                            </h1>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            className="text-white"
                                            href="/"
                                        >
                                            Home
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="text-white" />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            className="text-white"
                                            href="/education"
                                        >
                                            Education
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="text-white" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-slate-300">
                                            Beer Styles
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StylesHero;
