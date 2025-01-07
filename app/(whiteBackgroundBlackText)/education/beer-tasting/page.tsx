import Image from "next/image";

import TastingHero from "@/components/education/TastingHero";
import TastingSteps from "@/components/education/TastingSteps";
import {
    tasting1,
    tasting2,
    tasting3,
    tasting4,
    tasting5
} from "@/components/education/descriptions";

const BeerTastingPage = () => {
    return (
        <div className="bg-primary-foreground/15 pb-16">
            <TastingHero />
            <div className="mx-3 mt-20 flex flex-col justify-center rounded-2xl bg-white px-10 pt-16 pb-10 align-middle">
                <TastingSteps
                    step={1}
                    name="Appearance: Feast Your Eyes"
                    description={tasting1}
                    image="/images/tasting-paddle.jpg"
                />
                <TastingSteps
                    step={2}
                    name="Aroma: Engage Your Nose"
                    description={tasting2}
                    image="/images/tasting-smelling.jpg"
                />
                <TastingSteps
                    step={3}
                    name="Taste: Savor the Flavor"
                    description={tasting3}
                    image="/images/tasting-drinking.jpg"
                />
                <TastingSteps
                    step={4}
                    name="Mouthfeel: Feel the Texture"
                    description={tasting4}
                    image="/images/tasting-bubbles.jpg"
                />
                <TastingSteps
                    step={5}
                    name="Finish: The Lasting Impression"
                    description={tasting5}
                    image="/images/tasting-drinking.jpg"
                />
            </div>
        </div>
    );
};
export default BeerTastingPage;
