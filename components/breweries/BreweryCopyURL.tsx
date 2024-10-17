"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

const BreweryCopyURL = () => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.toString());
        toast.success("URL copied to clipboard");
    };

    return (
        <div
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white align-top text-lg text-black transition duration-300 ease-in-out hover:border-0 hover:bg-primary hover:text-white"
            onClick={copyToClipboard}
        >
            <Copy />
        </div>
    );
};
export default BreweryCopyURL;
