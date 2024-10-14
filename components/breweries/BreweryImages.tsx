import { BreweryType } from "@/types/breweries";

const BreweryImages = ({ data }: { data: BreweryType }) => {
    return (
        <div className="mt-24">
            <div className="carousel slide grid grid-cols-1 lg:grid-cols-10">
                <div className="col-span-8">
                    <div className="rounded-lg bg-white p-8 shadow-lg md:mb-20"></div>
                </div>
            </div>
        </div>
    );
};
export default BreweryImages;
