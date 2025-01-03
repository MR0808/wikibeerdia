import Image from "next/image";
import type { Metadata } from "next";

import ProcessHero from "@/components/education/ProcessHero";

const BeerProcessPage = () => {
    return (
        <div className="bg-primary/15 pb-20">
            <ProcessHero />
        </div>
    );
};
export default BeerProcessPage;
