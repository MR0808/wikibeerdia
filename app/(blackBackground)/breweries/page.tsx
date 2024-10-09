import Autocomplete from "@/components/autocomplete/Autocomplete";

const BreweryTest = () => {
    return (
        <div>
            <div className="mx-auto mt-36 flex h-16 w-[55%] flex-col justify-between space-y-12 sm:justify-between sm:space-x-0 md:space-x-4">
                <div className="flex w-full flex-col justify-between">
                    <div className="flex flex-col gap-y-5">
                        <h1 className="text-4xl font-semibold">Add Brewery</h1>
                    </div>
                </div>
            </div>
            <Autocomplete />
        </div>
    );
};
export default BreweryTest;
