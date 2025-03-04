import { Results } from "@/types/search";
import SearchListItem from "./SearchListItem";

const SearchListView = ({ results }: { results: Results[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {results.map((result) => {
                return <SearchListItem result={result} key={result.id} />;
            })}
        </div>
    );
};
export default SearchListView;
