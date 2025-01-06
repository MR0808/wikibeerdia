import {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8
} from "./descriptions";
import {
    BeerProcessStep,
    BeerSeparator
} from "@/components/education/BeerProcessStep";

const BeerProcessSteps = () => {
    return (
        <div className="container flex flex-col pt-10 pb-20">
            <BeerProcessStep
                step={1}
                name="Malting"
                description={step1}
                image="/images/step1-malt.jpg"
            />
            <BeerSeparator />
            <BeerProcessStep
                step={2}
                name="Mashing"
                description={step2}
                image="/images/step2-mashing.jpg"
            />
            <BeerSeparator />
            <BeerProcessStep
                step={3}
                name="Lautering"
                description={step3}
                image="/images/step3-lautering.jpg"
            />
            <BeerSeparator />
            <BeerProcessStep
                step={4}
                name="Boiling"
                description={step4}
                image="/images/step4-boiling.jpg"
            />
            <BeerSeparator />
            <BeerProcessStep
                step={5}
                name="Fermentation"
                description={step5}
                image="/images/step5-fermentation.jpg"
            />
            <BeerSeparator />
            <BeerProcessStep
                step={6}
                name="Conditioning"
                description={step6}
                image="/images/step6-conditioning.jpg"
            />
            <BeerSeparator />
            <BeerProcessStep
                step={7}
                name="Filtration and Packaging"
                description={step7}
                image="/images/step7-filtering.jpg"
            />
            <BeerSeparator />
            <BeerProcessStep
                step={8}
                name="Enjoying the Beer"
                description={step8}
                image="/images/step8-enjoying.jpg"
            />
        </div>
    );
};

export default BeerProcessSteps;
