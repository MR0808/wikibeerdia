"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { BeersFilterStyleProps, StyleFilter } from "@/types/beers";

const BeersFilterStyle = ({
    style,
    setStyle,
    styles
}: BeersFilterStyleProps) => {
    let group1: StyleFilter[] = [];
    let group2: StyleFilter[] = [];

    if (styles) {
        group1 = styles
            .filter((item) => style.includes(item.slug))
            .sort((a, b) => a.slug.localeCompare(b.slug));

        group2 = styles
            .filter((item) => !style.includes(item.slug))
            .sort((a, b) => {
                if (a.count > 0 && b.count === 0) return -1;
                if (a.count === 0 && b.count > 0) return 1;
                return a.slug.localeCompare(b.slug);
            });
    }

    const handleStyleChange = (styleChecked: string, checked: boolean) => {
        let newStyles = style;
        if (checked) {
            newStyles = [...newStyles, styleChecked];
        } else {
            newStyles = newStyles.filter((c) => c !== styleChecked);
        }
        setStyle(newStyles);
    };

    return (
        <Accordion type="multiple">
            <AccordionItem value="countries">
                <AccordionTrigger className="mb-1 text-xl font-bold text-black/80">
                    Beer Styles
                </AccordionTrigger>
                <AccordionContent>
                    <>
                        {style.length > 0 ? (
                            <>
                                <div
                                    className="cursor-pointer pb-6 hover:underline"
                                    onClick={() => setStyle([])}
                                >
                                    Clear
                                </div>

                                <div className="mb-6 flex flex-col space-y-4 border-b border-b-gray-200 pb-6">
                                    {group1.map((item) => {
                                        return (
                                            <div
                                                key={item.name}
                                                className="items-top flex space-x-2"
                                            >
                                                <Checkbox
                                                    id={item.slug}
                                                    checked={style.includes(
                                                        item.slug
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleStyleChange(
                                                            item.slug,
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor={item.slug}
                                                        className="leading-none font-medium"
                                                    >
                                                        {`${item.name} (${item.count})`}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-col space-y-4">
                                    {group2.map((item) => {
                                        return (
                                            <div
                                                key={item.slug}
                                                className="items-top flex space-x-2"
                                            >
                                                <Checkbox
                                                    id={item.slug}
                                                    checked={style.includes(
                                                        item.slug
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleStyleChange(
                                                            item.slug,
                                                            checked as boolean
                                                        )
                                                    }
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor={item.slug}
                                                        className="leading-none font-medium"
                                                    >
                                                        {`${item.name} (${item.count})`}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                {styles.map((item) => {
                                    return (
                                        <div
                                            key={item.slug}
                                            className="items-top flex space-x-2"
                                        >
                                            <Checkbox
                                                id={item.slug}
                                                checked={style.includes(
                                                    item.slug
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleStyleChange(
                                                        item.slug,
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor={item.slug}
                                                    className="leading-none font-medium"
                                                >
                                                    {`${item.name} (${item.count})`}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
export default BeersFilterStyle;
