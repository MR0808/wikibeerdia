import { Label } from "@/components/ui/label";
import { AutocompleteComponent } from "@/components/Autocomplete/Autocomplete";

const SubmitBreweryPage = async () => {
    return (
        <main className="mx-auto flex min-h-screen w-screen max-w-4xl flex-col items-center justify-center space-y-2 px-6">
            <h1 className="text-center text-4xl font-bold">
                Shadcn Address Autocomplete
            </h1>
            <p className="text-center text-secondary-foreground">
                An address autocomplete component using Google Places API and
                shadcn components.
            </p>
            <div className="w-full space-y-1 pt-7 md:w-1/2">
                <Label htmlFor="address">Address</Label>
                <AutocompleteComponent />
                <p className="text-xs text-muted-foreground">
                    This uses mock data. Go to github to see how to use the real
                    API.
                </p>
            </div>
        </main>
    );
};

export default SubmitBreweryPage;
