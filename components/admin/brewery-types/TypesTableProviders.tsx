"use client";

import { useContext, createContext, useState } from "react";

import { dataTableConfig, type DataTableConfig } from "@/config/dataTable";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

type FeatureFlagValue = DataTableConfig["featureFlags"][number]["value"];

interface TypesTableContextProps {
    featureFlags: FeatureFlagValue[];
    setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>;
}

const TypesTableContext = createContext<TypesTableContextProps>({
    featureFlags: [],
    setFeatureFlags: () => {}
});

export const useTypesTable = () => {
    const context = useContext(TypesTableContext);
    if (!context) {
        throw new Error(
            "useTasksTable must be used within a TasksTableProvider"
        );
    }
    return context;
};

export const TypesTableProvider = ({ children }: React.PropsWithChildren) => {
    const [featureFlags, setFeatureFlags] = useState<FeatureFlagValue[]>([]);

    return (
        <TypesTableContext.Provider
            value={{
                featureFlags,
                setFeatureFlags
            }}
        >
            <div className="w-full overflow-x-auto">
                <ToggleGroup
                    type="multiple"
                    variant="outline"
                    size="sm"
                    value={featureFlags}
                    onValueChange={(value: FeatureFlagValue[]) =>
                        setFeatureFlags(value)
                    }
                    className="w-fit"
                >
                    {dataTableConfig.featureFlags.map((flag) => (
                        <Tooltip key={flag.value} delayDuration={250}>
                            <ToggleGroupItem
                                value={flag.value}
                                className="whitespace-nowrap px-3 text-xs"
                                asChild
                            >
                                <TooltipTrigger>
                                    <flag.icon
                                        className="mr-2 size-3.5 shrink-0"
                                        aria-hidden="true"
                                    />
                                    {flag.label}
                                </TooltipTrigger>
                            </ToggleGroupItem>
                            <TooltipContent
                                align="start"
                                side="bottom"
                                sideOffset={6}
                                className="flex max-w-60 flex-col space-y-1.5 border bg-background py-2 font-semibold text-foreground"
                            >
                                <div>{flag.tooltipTitle}</div>
                                <div className="text-xs text-muted-foreground">
                                    {flag.tooltipDescription}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </ToggleGroup>
            </div>
            {children}
        </TypesTableContext.Provider>
    );
};