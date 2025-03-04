import { Results } from "@/types/search";
import SearchGridItem from "./SearchGridItem";

const SearchGridView = ({
    results,
    grids = 2
}: {
    results: Results[];
    grids?: number;
}) => {
    return (
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-${grids}`}>
            {results.map((result) => {
                return <SearchGridItem result={result} key={result.id} />;
            })}
        </div>
    );
};
export default SearchGridView;
