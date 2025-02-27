import { biorhyme } from "@/app/fonts";

import { getParentStyles } from "@/actions/beerStyles";
import BeersStylesFilter from "@/components/beers/listing/styles/BeersStylesFilter";

const BeersStylesPage = async () => {
    const { data } = await getParentStyles();
    return (
        <>
            <div className="bg-styles-beers-bg h-84 bg-black bg-cover bg-center drop-shadow-lg md:h-96">
                <div className="h-full bg-black/70">
                    <div
                        className={`${biorhyme.className} container my-auto flex h-full flex-col content-center items-center space-y-5 pt-32 align-bottom text-6xl font-semibold text-white md:pt-48`}
                    >
                        <div>Beers in any style you want...</div>
                    </div>
                </div>
            </div>
            <BeersStylesFilter parentStyles={data} />
        </>
    );
};
export default BeersStylesPage;
