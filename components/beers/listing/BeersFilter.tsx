"use client";

import { BeersFilterProps } from "@/types/beers";
import BeersFilterBrewery from "./BeersFilterBrewery";
import BeersFilterSearch from "./BeersFilterSearch";
import BeersFilterCountry from "./BeersFilterCountry";
import BeersFilterRating from "./BeersFilterRating";
import BeersFilterAbv from "./BeersFilterAbv";
import BeersFilterIbu from "./BeersFilterIbu";
import BeersFilterYear from "./BeersFilterYear";
import BeersFilterAvailable from "./BeersFilterAvailable";
import BeersFilterStyle from "./BeersFilterStyle";

const BeersFilter = ({
    filters,
    country,
    setCountry,
    search,
    setSearch,
    style,
    setStyle,
    brewery,
    setBrewery,
    abv,
    setAbv,
    ibu,
    setIbu,
    yearCreated,
    setYearCreated,
    available,
    setAvailable,
    rating,
    setRating,
    highest
}: BeersFilterProps) => {
    const highestAbv = parseFloat(highest.abv);
    const highestIbu = parseInt(highest.ibu);
    const highestYear = parseInt(highest.yearMax);
    const lowestYear = parseInt(highest.yearMin);

    return (
        <div className="rounded-3xl border border-black bg-white p-5">
            {filters && (
                <>
                    <BeersFilterSearch search={search} setSearch={setSearch} />
                    <BeersFilterStyle
                        style={style}
                        setStyle={setStyle}
                        styles={filters.styles}
                    />
                    <BeersFilterBrewery
                        brewery={brewery}
                        setBrewery={setBrewery}
                    />
                    <BeersFilterAbv
                        abv={abv}
                        setAbv={setAbv}
                        highestAbv={highestAbv}
                    />
                    <BeersFilterIbu
                        ibu={ibu}
                        setIbu={setIbu}
                        highestIbu={highestIbu}
                    />
                    <BeersFilterYear
                        yearCreated={yearCreated}
                        setYearCreated={setYearCreated}
                        highestYear={highestYear}
                        lowestYear={lowestYear}
                    />
                    <BeersFilterAvailable
                        available={available}
                        setAvailable={setAvailable}
                    />
                    <BeersFilterRating rating={rating} setRating={setRating} />
                    <BeersFilterCountry
                        country={country}
                        setCountry={setCountry}
                        countries={filters.countries}
                    />
                </>
            )}
        </div>
    );
};

export default BeersFilter;
