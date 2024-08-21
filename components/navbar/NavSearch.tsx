import { Input } from '../ui/input';

function NavSearch() {
    return (
        <Input
            type="search"
            placeholder="Search Beers..."
            className="w-full text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50"
        />
    );
}
export default NavSearch;
